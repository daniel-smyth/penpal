import nodemailer from "nodemailer";

const EMAIL_USERNAME = process.env.EMAIL_USERNAME;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

if (!EMAIL_USERNAME || !EMAIL_PASSWORD) {
  throw new Error("Email keys undefined. Please add to .env file.");
}

export interface ISendEmail {
  from: string;
  to: string;
  subject: string;
  html: string;
}

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: EMAIL_USERNAME,
        pass: EMAIL_PASSWORD,
      },
    });
  }

  public async sendEmail(options: ISendEmail): Promise<void> {
    const { from, to, subject, html } = options;
    await this.transporter.sendMail({ from, to, subject, html });
  }
}

const emailService = new EmailService();

export default emailService;
