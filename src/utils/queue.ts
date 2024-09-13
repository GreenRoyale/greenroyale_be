import Bull, { Job } from "bull";
import APP_CONFIG from "../../config/app.config";
import { IEmailData } from "../interfaces";
import { EmailService } from "../services/email.service";
import log from "./logger";

function asyncHandler(fn: (job: Job) => Promise<void>) {
  return (job: Job, done: Bull.DoneCallback) => {
    Promise.resolve(fn(job))
      .then(() => done())
      .catch((err) => {
        log.error(err);
        done(err);
        job.moveToFailed({ message: err.message }, true);
      });
  };
}

const emailQueue = new Bull("Green-Royale-Email", {
  redis: {
    host: APP_CONFIG.REDIS_HOST,
    port: APP_CONFIG.REDIS_PORT,
  },
  limiter: {
    max: 20,
    duration: 1000,
  },
  defaultJobOptions: {
    removeOnComplete: false,
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 5000,
    },
  },
});

const addEmailToQueue = async (data: IEmailData): Promise<void> => {
  const jobId = `email-${data.to}-${Date.now()}`;
  await emailQueue.add(data, { jobId });
  log.info(`Job ${jobId} added to queue for ${data.to}`);
};

emailQueue.process(
  5, // the number of jobs the queue can handle concurrently
  asyncHandler(async (job: Job<IEmailData>) => {
    const emailService = new EmailService();
    await emailService.sendmail(job.data);
    job.log("Email successfully sent to " + job.data.to);
    log.info({
      message: `Email successfully sent to ${job.data.to}`,
      jobId: job.id,
      timestamp: new Date().toISOString(),
    });
  }),
);
const handleJobEvents = (queue: Bull.Queue, type: string) => {
  queue.on("completed", (job: Job) => {
    log.info(`${type} Job with id ${job.id} has been completed`);
  });

  queue.on("failed", (job: Job, error: Error) => {
    log.error(
      `${type} Job with id ${job.id} has failed with error: ${error.message}`,
      {
        stack: error.stack,
        jobData: job.data,
      },
    );
  });

  queue.on("stalled", (job: Job) => {
    log.warn(`${type} Job with ID ${job.id} stalled and will be retried`);
  });
};

handleJobEvents(emailQueue, "Email");
export { addEmailToQueue, emailQueue };
