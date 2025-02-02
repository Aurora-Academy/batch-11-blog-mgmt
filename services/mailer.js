const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: process.env.SMTP_SERVICE,
  secure: false,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email Server is ready to take our messages");
  }
});

const sendMail = async ({ to, subject, message }) => {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"BlogQuill" <${process.env.SMTP_EMAIL}>`,
    to,
    subject,
    html: message,
  });
  return info?.messageId;
};

module.exports = { sendMail };
