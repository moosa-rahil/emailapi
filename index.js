const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/send-email", async (req, res) => {
  try {
    const { fullName, email, subject, message } = req.body;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "contact@moosaraheel.com",
      subject: subject,
      html: `
        <div style="font-family: Arial; background: #f4f4f4; padding: 40px;">
        <h3>Name : ${fullName}</h3>
        <h3>Email : ${email}</h3>
        <h3>Subject : ${subject}</h3>
        <p>${message}</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: "HTML email sent successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Email failed",
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
