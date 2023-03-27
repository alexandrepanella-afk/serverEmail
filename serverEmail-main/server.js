const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const details = require("./details.json");

const app = express();
app.use(cors({origin: "*" }));
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("The server started on port 3000");
});

app.get("/receive", (req, res) => {
  res.send(
    "<h1 style='text-align: center'>Wellcome to FunOfHeuristic <br><br>😃👻😃👻😃👻😃👻😃</h1>"
  );
});

app.post("/sendmail", (req, res) => {
  console.log("request came");
  let user = req.body;
  sendMail(user, info => {
    console.log(`The mail has beed send 😃 and the id is ${info.messageId}`);
    res.send(info);
  });
});

const  sendMail = async (user, callback) =>{
const transporter = nodemailer.createTransport({
  host: 'smtps.uhserver.com',
  port: 465,
  secure: true,
  auth: {
    user: 'alexandre.panella@vazoli.com.br',
    pass: 'Vazoli@alexandre'
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const mailOptions = {
  from: 'alexandre.panella@vazoli.com.br',
  to:  user.email,
  subject: 'Assunto do e-mail',
  html: `<h1>${user.text}</h1> <h1>${user.name}</h1><br>`
};

let info = await transporter.sendMail(mailOptions);

callback(info)
}
