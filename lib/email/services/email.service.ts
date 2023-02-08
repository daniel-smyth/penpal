import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import {
  VERIFICATION_REQUEST_HTML,
  VERIFICATION_REQUEST_TEXT,
} from "../templates/verificationRequest";

const EMAIL_SERVICE = process.env.EMAIL_SERVICE;
const EMAIL_HOST = process.env.EMAIL_HOST;
const EMAIL_USERNAME = process.env.EMAIL_USERNAME;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

if (!EMAIL_HOST || !EMAIL_SERVICE || !EMAIL_USERNAME || !EMAIL_PASSWORD) {
  throw new Error("Email keys undefined. Please add to .env file.");
}

const OPTIONS: SMTPTransport.Options = {
  from: EMAIL_USERNAME,
  service: EMAIL_SERVICE,
  host: EMAIL_HOST,
  auth: {
    user: EMAIL_USERNAME,
    pass: EMAIL_PASSWORD,
  },
};

class EmailService {
  private transport: nodemailer.Transporter;

  constructor(options: SMTPTransport.Options) {
    this.transport = nodemailer.createTransport({ ...options });
  }

  public async sendEmail(args: {
    to: string;
    subject: string;
    html: string;
  }): Promise<void> {
    await this.transport.sendMail({ ...args, from: EMAIL_USERNAME });
  }

  public async sendVerificationRequest({
    identifier: email,
    url,
  }: {
    identifier: string;
    url: string;
  }) {
    const result = await this.transport.sendMail({
      to: email,
      subject: `Sign in to Penpal`,
      text: VERIFICATION_REQUEST_TEXT(url),
      html: VERIFICATION_REQUEST_HTML(url),
    });
    const failed = result.rejected.concat(result.pending).filter(Boolean);
    if (failed.length) {
      throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
    }
    return true;
  }
}

const emailService = new EmailService(OPTIONS);

export default emailService;
