import nodemailer from "nodemailer";
import Notification from "../models/notification.js";
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
export const isUndefined = (data) => {
  return typeof data == "undefined";
};
export const createError = (res, status, message) => {
  res.status(status).json({ message });
};

export const sendMail = (to, subject, html) => {
  try {
    var transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_EMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to,
      subject,
      html,
    };
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) console.error("err in sending mail", err);
      else console.log("Mail transfered successfully.");
    });
  } catch (error) {
    console.error("error", error);
  }
};

export const createNotification = async (userId, title, description) => {
  try {
    if (!title) return console.error('Title is required for notificaiton')
    if (!description) return console.error('Description is required for notificaiton')
    if (!userId) return console.error('UserId is required for notificaiton')
    await Notification.create({ title, description, user: userId });
  } catch (error) {
    console.error("Error in createNotification: ", error);
  }
};

