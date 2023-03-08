const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
dotenv.config();

const apiKey = `${process.env.SENDGRID_API_KEY}`;
sgMail.setApiKey(apiKey);

const sendSGMail = async ({ to, sender, subject, html, attachments, text }) => {
  try {
    const from = "longhandsome2704@gmail.com";

    const msg = {
      to: to,
      from: from,
      subject: subject,
      html: html,
      attachments,
    };

    return sgMail.send(msg);
  } catch (error) {
    console.log(error);
  }
};

exports.sendEmail = async (args) => {
  if (!process.env.NODE_ENV === "development") {
    return Promise.resolve();
  } else {
    return sendSGMail(args);
  }
};
