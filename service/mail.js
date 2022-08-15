import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: oauth2.refresh_token || process.env.GOOGLE_REFRESH_TOKEN,
        accessToken: oauth2.access_token || process.env.GOOGLE_ACCESS_TOKEN,
    }
})

export const sendVerifyMail = async(email) => {
    const result = await transporter.sendMail({
        mail: {
            from: 'Cosmitto dating app',
            to: email,
            subject: 'email verify',
            template: ''
        }
    })
}