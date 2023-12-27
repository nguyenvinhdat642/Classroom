const express = require('express');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2Client = google.auth.OAuth2;
const router = express.Router();

const GOOGLE_MAILER_CLIENT_ID = '709778577188-arns12aavbpbnqfha9f4aa6087fhbui5.apps.googleusercontent.com';
const GOOGLE_MAILER_CLIENT_SECRET = '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';
const GOOGLE_MAILER_REFRESH_TOKEN = '1//049vmG_MK79goCgYIARAAGAQSNwF-L9Ir4oo-CkdvkmVVozjsFYLXMlZg8PY09PKEGmbS1wrijtUjRT15n77FSf28w9ISROlzmxA';
const ADMIN_EMAIL_ADDRESS = 'vinhdatgg09@gmail.com';

const myOAuth2Client = new OAuth2Client(GOOGLE_MAILER_CLIENT_ID, GOOGLE_MAILER_CLIENT_SECRET);
myOAuth2Client.setCredentials({
    refresh_token: GOOGLE_MAILER_REFRESH_TOKEN
});


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: ADMIN_EMAIL_ADDRESS,
        clientId: GOOGLE_MAILER_CLIENT_ID,
        clientSecret: GOOGLE_MAILER_CLIENT_SECRET,
        refreshToken: GOOGLE_MAILER_REFRESH_TOKEN,
        accessToken: myOAuth2Client.getAccessToken()
    }
});

router.post('/send-mail', async (req, res) => {
    const { email, otp } = req.body;

    try {
        await sendOtpToEmail(email, otp);
        res.json({ success: true, message: 'OTP sent successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Internal Server Error', details: err.message });
    }
});

async function sendMessageToEmail(email, message) {
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Thông báo từ Classroom',
        text: `Bạn đã tham gia: ${message}`
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
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

module.exports = router;
