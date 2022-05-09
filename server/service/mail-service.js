const nodeMailer = require("nodemailer");

class MailService {
  constructor() {
    this.transporter = nodeMailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      }
    })
  }

  async sendActivationMail(to, link){
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: "Активація акаунта" +  process.env.API_URL,
      text: "",
      html: `
        <div>
        <h1>Для актвиації акаунта перейдіть по силці</h1>
        <a href="${link}">${link}</a>
</div>
      `

    })
  };
}

module.exports = new MailService();