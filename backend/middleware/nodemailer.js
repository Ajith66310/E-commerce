import nodemailer from 'nodemailer';
import 'dotenv/config.js'

const sendMail = async (email, subject, message) => {
  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: `${process.env.MAIL_APP}`,
        pass: `${process.env.MAIL_APP_PASS}`
      }
    });

    let mailOptions = {
      from: `${process.env.MAIL_APP}`,
      to: email,
      subject,
      html: message
    };

    let info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.response}`);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

export default sendMail;
