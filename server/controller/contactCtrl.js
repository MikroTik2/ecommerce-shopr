const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");

const sendContact = asyncHandler(async (emailData, req, res) => {

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'prudence.hettinger82@ethereal.email',
      pass: 'jkJrpwa598rzaP4QYe'
    }
  });

  const info = await transporter.sendMail({
    from: '"Hello"',
    to: emailData.to, 
    subject: emailData.subject, 
    text: emailData.text, 
    html: emailData.html, 
  });
});


module.exports = sendContact;