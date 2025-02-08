const nodemailer = require("nodemailer");

const sendTicketEmail = async (
  email,
  name,
  eventName,
  ticketNumber,
  qrCodePath
) => {
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
    subject: `Your Ticket for ${eventName}`,
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Event Ticket</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
      color: #333;
    }
    .email-container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      padding: 10px 0;
      background-color: #007bff;
      color: #ffffff;
      border-radius: 8px 8px 0 0;
    }
    .content {
      padding: 20px;
      text-align: center;
    }
    .content p {
      font-size: 16px;
      line-height: 1.6;
    }
    .ticket-number {
      font-size: 18px;
      font-weight: bold;
      color: #007bff;
      margin-top: 10px;
    }
    .qr-code {
      margin-top: 20px;
      width: 200px;
      height: 200px;
    }
    .footer {
      text-align: center;
      font-size: 14px;
      color: #888;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>Your Ticket for ${eventName}</h1>
    </div>
    <div class="content">
      <p>Hello <strong>${name}</strong>,</p>
      <p>Thank you for registering for <strong>${eventName}</strong>!</p>
      <p class="ticket-number">Ticket Number: <strong>${ticketNumber}</strong></p>
      <p>Scan the QR code below to enter the event:</p>
      <img src="cid:qrCode" alt="QR Code" class="qr-code" />
    </div>
    <div class="footer">
      <p>If you have any questions, feel free to contact us.</p>
      <p>&copy; 2025 Your Event Team</p>
    </div>
  </div>
</body>
</html>`,

    // Ensure the QR Code is properly attached
    attachments: [
      {
        filename: "ticket_qr.png",
        path: qrCodePath, // Path where the QR Code is stored
        cid: "qrCode", // Ensure this matches the <img> tag in the email template
        contentType: "image/png", // Ensure correct MIME type
      },
    ],
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

module.exports = sendTicketEmail;
