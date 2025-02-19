const nodemailer = require("nodemailer");

const SendPassword = async (name, email, password, eventTitle) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Your Volunteer Login Details for ${eventTitle}`,
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Volunteer Account</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f8f9fa;
      margin: 0;
      padding: 0;
    }
    .container {
      width: 100%;
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      text-align: center;
    }
    .header {
      background-color: #007bff;
      color: white;
      padding: 15px;
      font-size: 22px;
      font-weight: bold;
      border-radius: 10px 10px 0 0;
    }
    .content {
      padding: 20px;
      font-size: 16px;
      color: #333;
    }
    .details {
      background-color: #f1f1f1;
      padding: 15px;
      border-radius: 8px;
      font-size: 18px;
      font-weight: bold;
      margin: 20px 0;
    }
    .button {
      display: inline-block;
      background-color: #007bff;
      color: white;
      padding: 12px 20px;
      font-size: 16px;
      font-weight: bold;
      text-decoration: none;
      border-radius: 6px;
      margin-top: 20px;
    }
    .footer {
      font-size: 14px;
      color: #777;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      Welcome to ${eventTitle}, ${name}!
    </div>
    <div class="content">
      <p>Thank you for volunteering for <strong>${eventTitle}</strong>. Below are your login credentials:</p>
      <div class="details">
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Password:</strong> ${password}</p>
      </div>
      <p>Use these credentials to log in to your volunteer portal and manage your tasks.</p>
      <a href="https://easeevents-cb281.web.app/login" class="button">Login Now</a>
    </div>
    <div class="footer">
      <p>If you have any questions, feel free to contact us.</p>
      <p>&copy; 2025 EaseEvents</p>
    </div>
  </div>
</body>
</html>`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

module.exports = SendPassword;
