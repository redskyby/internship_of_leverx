import nodemailer from "nodemailer";

interface CustomTransportOptions {
    host: string;
    port: number;
    secure: boolean;
    auth: {
        user: string;
        pass: string;
    };
}

class MailService {
    transporter: nodemailer.Transporter;

    constructor() {
        const options: CustomTransportOptions = {
            host: process.env.SMTP_HOST!,
            port: Number(process.env.SMTP_PORT),
            secure: false,
            auth: {
                user: process.env.SMTP_USER!,
                pass: process.env.SMTP_PASSWORD!,
            },
        };

        this.transporter = nodemailer.createTransport(options);
    }

    async sendNewInformation(sendToEmail: string, name: string, lastName: string) {
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
            throw new Error("Произошла ошибка при отправке обновленных данных на почту");
        }
    }
}

export default new MailService();
