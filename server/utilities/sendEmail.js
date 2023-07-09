const nodemailer = require('nodemailer')

module.exports = async (emailAddress, id, isNewEmail) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'autoreply978@gmail.com',
            pass: process.env.SMTP_PASSWORD
        }
    })

    const data = isNewEmail ? {
        subject: '[Flavorverse] Verify your new email',
        text: `To finish updating your email to this address, you must complete the verification by visiting this link: ${process.env.CLIENT_URL}/verify/${id}?email=true`
    }:{
        subject: '[Flavorverse] Verify your email',
        text: `Thank you for creating a Flavorverse account. Visit this link to verify your email and complete the account creation process: ${process.env.CLIENT_URL}/verify/${id}`
    }

    await transporter.sendMail({
        from: 'autoreply978@gmail.com',
        to: emailAddress,
        ...data
    })
}