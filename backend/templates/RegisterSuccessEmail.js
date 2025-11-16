// backend/templates/RegisterSuccessEmail.js
export const RegisterSuccessEmail = (name) => {
  return `
    <html>
      <body style="background-color:#f9fafb;font-family:Arial,Helvetica,sans-serif;margin:0;padding:0;">
        <div style="max-width:600px;margin:20px auto;background:#ffffff;padding:24px;border-radius:8px;box-shadow:0 2px 6px rgba(0,0,0,0.1);">
          
          <h2 style="color:#16a34a; text-align:center; margin-bottom:8px; font-size:22px; font-weight:600;">
            Registration Successful
          </h2>
          <p style="text-align:center;font-size:14px;color:#374151;margin-top:0;">
            Welcome to <strong>Bonkers Corner</strong>
          </p>

          <p style="font-size:15px;color:#111827;">Hi <strong>${name}</strong>,</p>
          <p style="font-size:15px;color:#374151;line-height:1.6;">
            Your account has been created successfully. You can now log in and start exploring Bonkers Corner.
          </p>

          <div style="text-align:center;margin:20px 0;">
            <a href="${process.env.FRONTEND_URL}/login"
               style="display:inline-block;background:#16a34a;color:#ffffff;padding:12px 24px;
                      border-radius:6px;text-decoration:none;font-weight:bold;">
              Login Now
            </a>
          </div>

          <p style="font-size:12px;color:#6b7280;margin-top:20px;line-height:1.5;">
            If you did not create this account, please ignore this email.  
            For assistance, contact <a href="mailto:support@bonkerscorner.com" style="color:#16a34a;text-decoration:none;">support@hehehehhe.com</a>.
          </p>
        </div>
      </body>
    </html>
  `;
};
