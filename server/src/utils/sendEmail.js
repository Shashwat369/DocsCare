const nodemailer = require("nodemailer");

let transporter;

const initTransporter = async () => {
  if (transporter) return;

  const testAccount = await nodemailer.createTestAccount();

  transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
    tls: {
      rejectUnauthorized: false, // 🔥 THIS IS THE KEY
    },
  });

  console.log("ETHEREAL USER:", testAccount.user);
};

const sendEmail = async (to, subject, text) => {
  await initTransporter();

  const info = await transporter.sendMail({
    from: '"DocsCare" <no-reply@docscare.com>',
    to,
    subject,
    text,
  });

  console.log("📧 OTP PREVIEW URL:", nodemailer.getTestMessageUrl(info));
};

module.exports = sendEmail;

