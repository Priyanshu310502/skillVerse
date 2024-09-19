const nodemailer = require('nodemailer');
const sendMailer = async (email, title, body) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });
        const info = await transporter.sendMail({
            from: '"Priyanshu" <zeck2599@gmail.com>',
            to: email,
            subject: title,
            html: body,
        });
        console.log(info);
        return  info;
    } catch (error) {
        console.log("Error occur", error)
    }
}

module.exports = sendMailer;