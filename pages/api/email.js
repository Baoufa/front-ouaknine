//import nodemailer from 'nodemailer';
import Sib from 'sib-api-v3-sdk';
import validator from 'validator';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { firstName, lastName, email, phone, message } = req.body;

    if (validator.isEmpty(firstName)) {
      res.status(500).json({ errorId: 'firstName' });
      return;
    }
    if (validator.isEmpty(lastName)) {
      res.status(500).json({ errorId: 'lastName' });
      console.log(lastName);
      return;
    }
    if (!validator.isEmail(email)) {
      res.status(500).json({ errorId: 'email' });
      return;
    }
    if (!validator.isMobilePhone(phone)) {
      res.status(500).json({ errorId: 'phone' });
      return;
    }
    if (validator.isEmpty(message)) {
      res.status(500).json({ errorId: 'message' });
      return;
    }

    return emailHandler(firstName, lastName, email, phone, message)
      .then(data => {
        res.status(200).json({ message: 'message sent' });
        return;
      })
      .catch(err => {
        console.log('ERROR', err);
        res.status(500).json({ errorId: err.message });
        return;
      });
  } else {
    console.log(req);
  }
}

function emailHandler(firstName, lastName, email, phone, message) {
  const client = Sib.ApiClient.instance;
  const apiKey = client.authentications['api-key'];
  apiKey.apiKey = process.env.SENDINBLUE_TOKEN;

  const tranEmailApi = new Sib.TransactionalEmailsApi();
  const sender = {
    email: email,
    name: `${firstName} ${lastName}`,
  };
  const receivers = [
    {
      email: 'benjamin.anoufa@gmail.com',
    },
  ];

  return tranEmailApi
    .sendTransacEmail({
      sender,
      to: receivers,
      subject: `Message site web de ${firstName} ${lastName}`,
      htmlContent: `
          <p><b>Date d'envoi :</b> ${new Date().toLocaleString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}</p>
          <p><b>Prénom :</b> ${firstName} - <b>Nom de famille :</b> ${lastName}</p>
          <p><b>Email :</b> ${email} - <b>Téléphone :</b> ${phone}</p>
          <p><b>Message :</b></p>
          <p style="white-space: pre;">${message}</p>
                  `,
      params: {
        role: 'Frontend',
      },
    })
    .then(data => console.log(data))
    .catch(err => err);
}