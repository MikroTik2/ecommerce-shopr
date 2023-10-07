const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");

const sendEmail = asyncHandler(async (data, req, res) => {

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'lucas.pacocha62@ethereal.email',
            pass: 'qCBf4EBXKhvbxsab2G'
        }
    });

  const info = await transporter.sendMail({
    from: '"Hey 👻" <abc@gmail.com.com>',
    to: data.to, 
    subject: data.subject, 
    text: data.text, 
    html: data.html, 
  });

  console.log("Message sent:", info.messageId);
  console.log("Preview URL:", nodemailer.getTestMessageUrl(info));

});


module.exports = sendEmail;