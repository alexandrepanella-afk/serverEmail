const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/send', (req, res) => {
  // código para enviar o e-mail
});

app.get('/receive', (req, res) => {
  // código para receber o e-mail
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
const transporter = nodemailer.createTransport({
  host: 'imap.gmail.com',
  port: 993,
  secure: true,
  auth: {
    user: 'seu-email@gmail.com',
    pass: 'sua-senha'
  }
});

transporter.once('connected', () => {
  console.log('Conectado ao servidor IMAP');
  transporter.openBox('INBOX', (error, box) => {
    if (error) throw error;
    console.log(`Caixa de entrada aberta: ${box.messages.total} mensagens`);
    transporter.search(['UNSEEN'], (error, result) => {
      if (error) throw error;
      console.log(`Mensagens não lidas: ${result.length}`);
      result.forEach(uid => {
        const fetchOptions = {
          bodies: ['HEADER', 'TEXT'],
          markSeen: true
        };
        const messageStream = transporter.createMessageStream(uid, fetchOptions);
        messageStream.pipe(process.stdout);
      });
    });
  });
});

const mailOptions = {
  from: 'seu-email@gmail.com',
  to: 'email-do-destinatario@gmail.com',
  subject: 'Assunto do e-mail',
  text: 'Mensagem do e-mail'
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error);
  } else {
    console.log('E-mail enviado: ' + info.response);
  }
});

