// src/lib/sendMail.ts
import nodemailer from 'nodemailer';

export const sendConfirmationEmail = async (email: string, meetingDetails: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL, // Your email address
      pass: process.env.PASSWORD, // Your email password or App Password (if 2FA enabled)
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Meeting Scheduled',
    text: `Your meeting has been scheduled: ${meetingDetails}`,
  };

  await transporter.sendMail(mailOptions);
};
