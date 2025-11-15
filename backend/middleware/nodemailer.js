import nodemailer from 'nodemailer';
import 'dotenv/config.js';

const sendMail = async (email, subject, message) => {
  try {
    // Use explicit SMTP settings
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,          // TLS port, works better on Render
      secure: false,      // false = use STARTTLS
      requireTLS: true,   // enforce TLS
      auth: {
        user: process.env.MAIL_APP,       
        pass: process.env.MAIL_APP_PASS,  
      },
      connectionTimeout: 10000, 
    });

    const mailOptions = {
      from: process.env.MAIL_APP,
      to: email,
      subject,
      html: message,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

export default sendMail;
