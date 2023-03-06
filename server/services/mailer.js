const sgMail = require("@sendgrid/mail");

console.log(process.env.SG_KEY);

sgMail.setApiKey(process.env.SG_KEY);

const sendSGMail = async ({ to, sender, subject, html, attachments, text }) => {
  try {
    const from = "duclong9a2@gmail.com";

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
