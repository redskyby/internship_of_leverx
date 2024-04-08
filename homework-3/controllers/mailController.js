const nodemailer = require("nodemailer");

class MailController {
    constructor() {
        this.transporter = nodemailer.createTransport({
            // host : process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            host: "smtp.gmail.com",
            secure: false,
            auth: {
                // user: process.env.SMTP_USER,
                // pass: process.env.SMTP_PASSWORD,
                user: "pashadocenko@gmail.com",
                pass: "dmvu brpk qrdf gnlj ",
            },
        });
    }

    async sendNewInformation(to, name, lastName) {
        try {
            await this.transporter.sendMail({
                from: process.env.SMTP_USER,
                to: "x0xmik@mail.ru",
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
