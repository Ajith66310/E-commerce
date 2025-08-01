import nodemailer from 'nodemailer';

const sendMail = (req,res)=>{

  const otp = Math.round(Math.random()*10000)+111111

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'neverbuyfromherekettow@gmail.com',
      pass: 'ckkt qixn hstj qzyp'
    }
  });
  
let mailOptions = {
  from: 'neverbuyfromherekettow@gmail.com',
  to: 'ajith66310@gmail.com',
  subject: 'Sending Email using Node.js',
  text:`${otp}`,
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
    res.json({message:'hello'})  
  }
});

}

export default sendMail;
