const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text, qrCode) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
    attachments: [
      {
        filename: "ticket-qr-code.png",
        content: qrCode.split("base64,")[1], // Extract base64 data from Data URL
        encoding: "base64",
      },
    ],
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
