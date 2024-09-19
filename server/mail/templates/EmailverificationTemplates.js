function emailVerificationRequest(email, name, verificationLink) {
    return `
      <html>
        <body>
          <h2>Hello ${name},</h2>
          <p>Thank you for signing up! To complete your registration, please verify your email address by clicking the link below:</p>
          <p><a href="${verificationLink}" target="_blank">Verify My Email Address</a></p>
          <p>If you did not sign up for this account, please disregard this email.</p>
          <p>Best regards,<br>Your Support Team</p>
        </body>
      </html>
    `;
}


function emailVerificationReminder(email, name, verificationLink) {
    return `
      <html>
        <body>
          <h2>Hello ${name},</h2>
          <p>We noticed that you haven't verified your email address yet. Please complete your registration by clicking the link below:</p>
          <p><a href="${verificationLink}" target="_blank">Verify My Email Address</a></p>
          <p>If you did not sign up for this account, please disregard this email.</p>
          <p>Best regards,<br>Your Support Team</p>
        </body>
      </html>
    `;
}



function emailVerifiedConfirmation(email, name) {
    return `
      <html>
        <body>
          <h2>Hello ${name},</h2>
          <p>Congratulations! Your email address (${email}) has been successfully verified.</p>
          <p>You can now access all the features of your account. Thank you for verifying your email!</p>
          <p>If you have any questions or need further assistance, feel free to reach out to us.</p>
          <p>Best regards,<br>Your Support Team</p>
        </body>
      </html>
    `;
}

module.exports = emailVerifiedConfirmation, emailVerificationReminder, emailVerificationRequest;
