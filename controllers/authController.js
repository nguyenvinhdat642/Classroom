const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2Client = google.auth.OAuth2;
const router = express.Router();

const GOOGLE_MAILER_CLIENT_ID = '3962031896-f02rnenicut7roggoivpil6efgtkih0d.apps.googleusercontent.com';
const GOOGLE_MAILER_CLIENT_SECRET = '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';
const GOOGLE_MAILER_REFRESH_TOKEN = '1//04i2Iu5VyZAmYCgYIARAAGAQSNwF-L9IrWEbZYP8qnzUtr7OB3i17GvEjD6cKoqX3iZJ7qz2fw8ob3HXcAOErDZsS5WAshM1Z-Fw';
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

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Tìm người dùng theo email
        const user = await User.findByEmail(email);

        // Kiểm tra xem người dùng tồn tại và mật khẩu có đúng không
        if (user && await bcrypt.compare(password, user.password)) {
            // Đăng nhập thành công, lưu thông tin người dùng vào session
            req.session.user = user;
            req.flash('success', 'Đăng nhập thành công!');
            res.redirect('/');
        } else {
            req.flash('error', 'Email hoặc mật khẩu không đúng!');
            res.redirect('/login');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Lỗi server');
    }
});


router.post('/register', async (req, res) => {
    console.log('Đã nhận yêu cầu POST đăng ký:', req.body);
    const { email, password, confirm_password } = req.body;

    try {
        // Kiểm tra xem email đã tồn tại chưa
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            req.flash('error', 'Email đã được đăng ký!');
            return res.redirect('/register');
        }

        // Tạo OTP và lưu vào session
        const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false });
        req.session.otp = otp;
        // Lưu mật khẩu vào session
        req.session.registerPassword = password;

        // Gửi OTP đến email của người dùng
        await sendOtpToEmail(email, otp);

        res.render('confirm-otp', { email });
    } catch (err) {
        console.error(err);
        res.status(500).send('Lỗi server');
    }
});

router.post('/confirm-otp', (req, res) => {
    const { email, otp } = req.body;
    console.log('Đã nhận yêu cầu POST xác nhận OTP:', req.body);
    const password = req.session.registerPassword;
    console.log('Mật khẩu đã lưu trong session:', password)
    // Kiểm tra xem OTP có khớp không
    if (otp === req.session.otp) {
        
        if (!password) {
            console.error('Password is undefined');
            res.status(400).send('Bad Request: Missing password');
            return;
        } else {
            try {
                User.create({ email, password});
                req.flash('success', 'Đăng ký thành công!');
                console.log('Đăng ký thành công!');
                res.redirect('/login');
            } catch (err) {
                console.error(err);
                res.status(500).send('Lỗi server khi lưu thông tin người dùng vào database');
            }
        }
    } else {
        req.flash('error', 'OTP không đúng!');
        res.redirect('/register');
    }
});

// Phương thức gửi email
async function sendOtpToEmail(email, otp) {
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Xác nhận OTP',
        text: `Mã OTP của bạn là: ${otp}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    console.log('Gửi email với OTP:', email, otp);
}

module.exports = router;
