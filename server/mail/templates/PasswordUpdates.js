function passwordUpdatedEmail(email, name) {
    return `
      <html>
        <body>
          <h2>Hello ${name},</h2>
          <p>We wanted to inform you that the password for your account associated with this email address (${email}) has been successfully updated.</p>
          <p>If you did not make this change, please contact our support team immediately.</p>
          <p>If you did update your password, no further action is required.</p>
          <p>Thank you for taking steps to secure your account.</p>
          <p>Best regards,<br>Your Support Team</p>
        </body>
      </html>
    `;
}

module.exports = passwordUpdatedEmail;
