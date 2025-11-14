import nodemailer from "nodemailer";

export const sendContactMail = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_APP,
        pass: process.env.MAIL_APP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.MAIL_APP,
      replyTo: email,
      to: process.env.MAIL_APP,
      subject: `📩 New Contact Message - ${subject}`,
      html: `
        <h2>New Message from Contact Form</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br />${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Email sent successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to send email", error: err });
  }
};
