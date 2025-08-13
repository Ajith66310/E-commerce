import nodemailer from 'nodemailer';

const sendMail = async (email, subject, message) => {
  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'neverbuyfromherekettow@gmail.com',
        pass: 'ckkt qixn hstj qzyp'
      }
    });

    let mailOptions = {
      from: 'neverbuyfromherekettow@gmail.com',
      to: email,
      subject,
      text: message
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
