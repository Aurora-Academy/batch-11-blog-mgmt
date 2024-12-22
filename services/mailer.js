const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: process.env.SMTP_SERVICE,
  secure: false,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
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
