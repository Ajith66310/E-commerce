import Mailjet from 'node-mailjet';
import 'dotenv/config.js';

const mailjet = Mailjet.apiConnect(
  process.env.MJ_API_KEY_PUBLIC,
  process.env.MJ_API_KEY_PRIVATE
);

export const sendMail = async (to, subject, html) => {
  try {
    const request = mailjet
      .post("send", { version: 'v3.1' })
      .request({
        Messages: [
          {
            From: {
              Email: process.env.MAIL_SENDER,
              Name: "Vestido Club",
            },
            To: [
              { Email: to }
            ],
            Subject: subject,
            HTMLPart: html,
          },
        ],
      });

    await request;
    console.log("Mailjet Email Sent Successfully");
    return true;

  } catch (error) {
    console.error("Mailjet Error:", error?.response?.data || error);
    return false;
  }
};
