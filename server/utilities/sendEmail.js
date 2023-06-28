const nodemailer = require('nodemailer')

module.exports = async (emailAddress, id) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'autoreply978@gmail.com',
            pass: process.env.SMTP_PASSWORD
        }
    })

    await transporter.sendMail({
        from: '1w3r4f51hh3k@gmail.com',
        to: emailAddress,
        subject: '[Flavorverse] Verify your email',
        text: `Thank you for creating a Flavorverse account. Visit this link to verify your email and complete the account creation process: ${process.env.API_URL}/verify/${id}`
    })
}