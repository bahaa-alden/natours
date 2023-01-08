import nodemailer from 'nodemailer';
//need transporter
const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    // service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  //Create mail options
  const mailOptions = {
    from: 'Bahaa Alden <samerabood195@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  //Actually send the mail
  await transporter.sendMail(mailOptions);
};

export default sendEmail;
