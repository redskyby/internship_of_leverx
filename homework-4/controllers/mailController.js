const nodemailer = require("nodemailer");

// Контроллер для отправки почты

class MailController {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });
    }

    async sendNewInformation(sendToEmail, name, lastName) {
        try {
            await this.transporter.sendMail({
                from: process.env.SMTP_USER,
                to: sendToEmail,
                subject: "Новые данные",
                text: "",
                html: `
                    <div>
                        <h1>Новые данные.</h1>
                        <h2>новое имя: ${name}</h2>
                        <h2>новая фамилия: ${lastName}</h2>
                    </div>
                    
                    `,
            });
        } catch (e) {
            console.error(e);
        }
    }
}

module.exports = new MailController();
