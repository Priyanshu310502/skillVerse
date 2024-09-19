function courseEnrollmentConfirmation(studentName, courseTitle, startDate) {
    return `
      <html>
        <body>
          <h2>Hello ${studentName},</h2>
          <p>Congratulations! You have successfully enrolled in the course <strong>${courseTitle}</strong>.</p>
          <p>The course is scheduled to start on <strong>${startDate}</strong>. We are excited to have you on board and look forward to a successful learning journey together.</p>
          <p>If you have any questions or need further assistance, feel free to reach out to us.</p>
          <p>Best regards,<br>Your Learning Team</p>
        </body>
      </html>
    `;
  }

  function courseEnrollmentReminder(studentName, courseTitle, startDate) {
    return `
      <html>
        <body>
          <h2>Hello ${studentName},</h2>
          <p>This is a reminder that your course <strong>${courseTitle}</strong> is starting soon.</p>
          <p>The course will begin on <strong>${startDate}</strong>. Please ensure that you have completed all necessary preparations before the course starts.</p>
          <p>We look forward to seeing you in class!</p>
          <p>Best regards,<br>Your Learning Team</p>
        </body>
      </html>
    `;
  }

  function courseEnrollmentCancellation(studentName, courseTitle) {
    return `
      <html>
        <body>
          <h2>Hello ${studentName},</h2>
          <p>We regret to inform you that your enrollment in the course <strong>${courseTitle}</strong> has been canceled.</p>
          <p>If this was a mistake or if you need further information, please do not hesitate to contact us.</p>
          <p>Best regards,<br>Your Learning Team</p>
        </body>
      </html>
    `;
  }
  function courseEnrollmentWelcome(studentName, courseTitle, instructorName) {
    return `
      <html>
        <body>
          <h2>Welcome ${studentName}!</h2>
          <p>We are thrilled to have you enrolled in the course <strong>${courseTitle}</strong>.</p>
          <p>Your instructor, <strong>${instructorName}</strong>, is looking forward to guiding you through this exciting journey. Get ready for a great learning experience!</p>
          <p>Best regards,<br>Your Learning Team</p>
        </body>
      </html>
    `;
  }
  function courseEnrollmentCompletion(studentName, courseTitle) {
    return `
      <html>
        <body>
          <h2>Congratulations ${studentName}!</h2>
          <p>You have successfully completed the course <strong>${courseTitle}</strong>.</p>
          <p>We hope you enjoyed the learning experience and gained valuable knowledge.</p>
          <p>Thank you for being a part of our community, and we wish you continued success in your future endeavors.</p>
          <p>Best regards,<br>Your Learning Team</p>
        </body>
      </html>
    `;
  }
      