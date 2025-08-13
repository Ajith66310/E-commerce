import nodemailer from 'nodemailer';

const sendMail = (email,otp,subject)=>{
  
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
  subject: `${subject}`,
  text:`${otp }`,
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

}

export default sendMail;
