const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2Client = google.auth.OAuth2;

class Mail {
    constructor() {
        this.GOOGLE_MAILER_CLIENT_ID = '709778577188-arns12aavbpbnqfha9f4aa6087fhbui5.apps.googleusercontent.com';
        this.GOOGLE_MAILER_CLIENT_SECRET = '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';
        this.GOOGLE_MAILER_REFRESH_TOKEN = '1//049vmG_MK79goCgYIARAAGAQSNwF-L9Ir4oo-CkdvkmVVozjsFYLXMlZg8PY09PKEGmbS1wrijtUjRT15n77FSf28w9ISROlzmxA';
        this.ADMIN_EMAIL_ADDRESS = 'vinhdatgg09@gmail.com';

        this.myOAuth2Client = new OAuth2Client(this.GOOGLE_MAILER_CLIENT_ID, this.GOOGLE_MAILER_CLIENT_SECRET);
        this.myOAuth2Client.setCredentials({
            refresh_token: this.GOOGLE_MAILER_REFRESH_TOKEN
        });

        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: this.ADMIN_EMAIL_ADDRESS,
                clientId: this.GOOGLE_MAILER_CLIENT_ID,
                clientSecret: this.GOOGLE_MAILER_CLIENT_SECRET,
                refreshToken: this.GOOGLE_MAILER_REFRESH_TOKEN,
                accessToken: this.myOAuth2Client.getAccessToken()
            }
        });
    }

    async sendEmail(email, message) {
        try {
            await this.sendMessageToEmail(email, message);
            return { success: true, message: 'Email sent successfully' };
        } catch (error) {
            console.error(error);
            throw { success: false, error: 'Internal Server Error', details: error.message };
        }
    }

    async sendMessageToEmail(email, message) {
        const mailOptions = {
            from: 'your-email@gmail.com',
            to: email,
            subject: 'Thông báo từ Classroom',
            text: `Bạn đã tham gia: ${message}, hãy truy Cập vào lớp học để xem chi tiết`
        };

        return new Promise((resolve, reject) => {
            this.transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error(error);
                    reject(error);
                } else {
                    console.log('Email sent: ' + info.response);
                    resolve();
                }
            });
        });
    }
}

module.exports = Mail;
