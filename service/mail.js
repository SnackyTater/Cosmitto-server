import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        accessToken: process.env.GOOGLE_ACCESS_TOKEN,
    }
})

const sendVerifyMail = async(email) => {
    const result = await transporter.sendMail({
        mail: {
            from: 'Cosmitto dating app',
            to: email,
            subject: 'email verify',
            template: ''
        }
    })
}

module.exports = {
    sendVerifyMail,
}