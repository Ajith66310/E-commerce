import Mailjet from "node-mailjet";

export const sendContactMail = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const mailjet = Mailjet.apiConnect(
      process.env.MJ_API_KEY_PUBLIC,
      process.env.MJ_API_KEY_PRIVATE
    );

     await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: process.env.MAIL_SENDER,
            Name: "Vestido Club",
          },
          To: [
            {
              Email: process.env.MAIL_SENDER, 
            },
          ],
          ReplyTo: {
            Email: email,
            Name: name,
          },
          Subject: `📩 New Contact Message - ${subject}`,
          HTMLPart: `
            <h2>New Message from Contact Form</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong><br />${message}</p>
          `,
        },
      ],
    });

    res.json({ message: "Email sent successfully" });

  } catch (err) {
    console.log("Mailjet Error:", err);
    res.status(500).json({ message: "Failed to send email", error: err });
  }
};
