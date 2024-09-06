import nodemailer, { Transporter } from "nodemailer";
import path from "path";
import pug from "pug";
import APP_CONFIG from "../../config/app.config";
import { ClientError } from "../exceptions/clientError";
import { IEmailData } from "../interfaces";
import log from "../utils/logger";

export class EmailService {
  private transporter: Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: APP_CONFIG.SMTP_FROM_ADDRESS,
      port: APP_CONFIG.SMTP_PORT,
      secure: APP_CONFIG.SMTP_SECURE,
      auth: {
        user: APP_CONFIG.SMTP_USER,
        pass: APP_CONFIG.SMTP_PASSWORD,
      },
    });
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
        "views/email",
        `${emailData.template}.pug`,
      );
      const html = pug.renderFile(templatePath, emailData.variables);
      const mailOptions = {
        from: APP_CONFIG.SMTP_FROM_ADDRESS,
        to: emailData.to,
        subject: emailData.subject,
        html,
      };
      await this.transporter.sendMail(mailOptions);
      return `Email successfully sent to ${emailData.to}`;
    } catch (error) {
      log.error(`Failed to send email to ${emailData.to}: ${error.message}`, {
        stack: error.stack,
        emailData,
      });
      throw new ClientError(`Failed to send emai: ${error.message}`);
    }
  }
}

/**
 * const emailData = {
 *  to: "example@example.com",
 *  subject: "Reset your password",
 *  template: "reset-password",
 *  variables: {
 *    userName: "Fish Pie",
 *    resetLink: "https://example.com"
 * }
 * }
 *
 * await addEmailToQueue(emailData)
 */
