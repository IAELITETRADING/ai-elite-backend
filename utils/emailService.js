const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);

const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY
});

exports.sendEmail = async (to, subject, text) => {
  try {
    await mg.messages.create(process.env.MAILGUN_DOMAIN, {
      from: process.env.MAIL_FROM,
      to,
      subject,
      text
    });
  } catch (err) {
    console.error('❌ Erreur envoi mail:', err.message);
  }
};
