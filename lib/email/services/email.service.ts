import nodemailer from 'nodemailer';

export interface ISendEmail {
  from: string;
  to: string;
  subject: string;
  html: string;
}

class EmailService {
  private transporter: any;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.example.com',
      port: 465,
      secure: true,
      auth: {
        user: 'username',
        pass: 'password'
      }
    });
  }

  public async sendEmail(options: ISendEmail): Promise<void> {
    const { from, to, subject, html } = options;
    await this.transporter.sendMail({ from, to, subject, html });
  }
}

const emailService = new EmailService();

export default emailService;
