import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();
const port = 3004;

// Load environment variables from the appropriate file for development or production
const isDev = process.env.NODE_ENV !== 'production';
if (isDev) {
  require('dotenv').config({ path: '../.env.development.local' });
} else {
  require('dotenv').config();
}

app.use(cors());
app.use(bodyParser.json());

// Configure nodemailer with your email service details
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.REACT_APP_EMAIL_USER,
    pass: process.env.REACT_APP_EMAIL_PASS,
  },
});

// Debugging: Print environment variables to ensure they are loaded correctly
console.log('Email User:', process.env.REACT_APP_EMAIL_USER);
console.log('Email Pass:', process.env.REACT_APP_EMAIL_PASS);
console.log('Email Recipient:', process.env.REACT_APP_EMAIL_RECIPIENT);

// Route to handle the form submission
app.post('/send-email', (req: Request, res: Response) => {
  const { name, tel, subject, email, message } = req.body;

  if (!name || !tel || !subject || !email || !message) {
    return res.status(400).send('All fields are required');
  }

  const mailOptions = {
    from: process.env.REACT_APP_EMAIL_USER,
    to: process.env.REACT_APP_EMAIL_RECIPIENT,
    subject: subject,
    text: `Name: ${name}\n Tel: ${tel}\n Email: ${email}\n Message: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Failed to send email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

// New GET route to test server
app.get('/status', (req: Request, res: Response) => {
  res.status(200).send('Server is running and working correctly');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
