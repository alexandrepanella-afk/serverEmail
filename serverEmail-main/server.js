const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const express = require('express');

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
  from: 'alexandre.panella@vazoli.com.br',
  to:  'alexandre.panella@vazoli.com.br',
  subject: 'Assunto do e-mail',
  html: '<h1>Welcome</h1><p>That was easy!</p>'
  
};
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error);
  } else {
    console.log('E-mail enviado: ' + info.response);
  }
});
