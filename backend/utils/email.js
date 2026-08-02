const nodemailer = require('nodemailer');

console.log('Email user:', process.env.EMAIL_USER);
console.log('Email pass:', process.env.EMAIL_PASS ? '*****' : 'MISSING');


const transporter = nodemailer.createTransport({
  service: 'gmail', // or your email provider
  auth: {
    user: process.env.EMAIL_USER, // your email address
    pass: process.env.EMAIL_PASS, // app password or email password
  },
});

async function sendOtpEmail(toEmail, otp) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: 'Your OTP Code',
    text: `Your OTP code for registration is: ${otp}. It is valid for 10 minutes.`,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

module.exports = { sendOtpEmail };
