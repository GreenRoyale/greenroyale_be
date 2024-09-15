import nodemailer, { SendMailOptions, Transporter } from "nodemailer";
import path from "path";
import pug from "pug";
import APP_CONFIG from "../../config/app.config";
import { ClientError } from "../exceptions/clientError";
import { IEmailData } from "../interfaces";
import log from "../utils/logger";

export class EmailService {
  private transporter: Transporter;
  constructor() {
    if (APP_CONFIG.NODE_ENV === "production") {
      this.transporter = nodemailer.createTransport({
        service: "SendGrid",
        auth: {
          user: APP_CONFIG.SENDGRID_USERNAME,
          pass: APP_CONFIG.SENDGRID_PASSWORD,
        },
      });
    } else {
      this.transporter = nodemailer.createTransport({
        host: APP_CONFIG.SMTP_HOST,
        port: APP_CONFIG.SMTP_PORT,
        secure: APP_CONFIG.SMTP_SECURE,
        auth: {
          user: APP_CONFIG.SMTP_USER,
          pass: APP_CONFIG.SMTP_PASSWORD,
        },
      });
    }
  }

  /**
   * Sends an email using the provided email data
   * @param emailData - Contains email properties like 'to', 'subject', and 'html'
   * @returns A success message when email is sent
   */
  async sendmail(emailData: IEmailData): Promise<string> {
    try {
      const templatePath = path.join(
        __dirname,
        "..",
        "views/emails",
        `${emailData.template}.pug`,
      );
      const html = pug.renderFile(templatePath, emailData.variables);
      const mailOptions: SendMailOptions = {
        from: APP_CONFIG.SMTP_FROM_ADDRESS,
        to: emailData.to,
        subject: emailData.subject,
        html,
      };
      console.log("EmailService is called");
      await this.transporter.sendMail(mailOptions);
      return `Email successfully sent to ${emailData.to}`;
    } catch (error) {
      log.error(`Failed to send email to ${emailData.to}: ${error.message}`, {
        stack: error.stack,
        emailData,
      });
      throw new ClientError(`Failed to send email: ${error.message}`);
    }
  }
}
