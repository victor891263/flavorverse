const nodemailer = require('nodemailer')

module.exports = async (emailAddress, id, type) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'autoreply978@gmail.com',
            pass: process.env.SMTP_PASSWORD
        }
    })

    const data = ((type === 'account') && {
        subject: '[Flavorverse] Verify your email',
        text: `Thank you for creating a Flavorverse account. Visit this link to verify your email and complete the account creation process: ${process.env.CLIENT_URL}/verify/${id}`
    }) || ((type === 'email') && {
        subject: '[Flavorverse] Verify your new email',
        text: `To finish updating your email to this address, you must complete the verification by visiting this link: ${process.env.CLIENT_URL}/verify/${id}?email=true`
    }) || ((type === 'password') && {
        subject: '[Flavorverse] Recover your password',
        text: `To reset your password, visit this link: ${process.env.CLIENT_URL}/reset/${id}`
    })

    await transporter.sendMail({
        from: 'autoreply978@gmail.com',
        to: emailAddress,
        ...data
    })
}