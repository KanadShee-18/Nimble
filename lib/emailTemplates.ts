export const emailTemplates = {
  VERIFY: (confirmLink: string, body: string) => `
      <div style="background-color: #f4f4f4; padding: 20px; font-family: Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #282a54; padding: 15px; color: #ffffff; text-align: center;">
            <h2>Verify Your Email</h2>
          </div>
          <div style="padding: 20px; text-align: center;">
            <p>${body}</p>
            <a href="${confirmLink}" style="display: inline-block; background-color: #282a54; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 20px;">Verify Email</a>
            <p style="margin-top: 15px; color: #666; font-size: 0.9em;">This link will expire in 5 minutes.</p>
          </div>
        </div>
      </div>
    `,
  RESET: (confirmLink: string, body: string) => `
      <div style="background-color: #f4f4f4; padding: 20px; font-family: Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #dc3545; padding: 15px; color: #ffffff; text-align: center;">
            <h2>Reset Your Password</h2>
          </div>
          <div style="padding: 20px; text-align: center;">
            <p>${body}</p>
            <a href="${confirmLink}" style="display: inline-block; background-color: #dc3545; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 20px;">Reset Password</a>
            <p style="margin-top: 15px; color: #666; font-size: 0.9em;">This link will expire in 5 minutes.</p>
          </div>
        </div>
      </div>
    `,
  TWO_FA: (token: string) => `
      <div style="background-color: #f4f4f4; padding: 20px; font-family: Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #17a2b8; padding: 15px; color: #ffffff; text-align: center;">
            <h2>Two-Factor Authentication Code</h2>
          </div>
          <div style="padding: 20px; text-align: center;">
            <p>Your 2FA code is:</p>
            <h3 style="background: #f8f9fa; padding: 10px; border-radius: 5px; display: inline-block;">${token}</h3>
            <p style="margin-top: 15px; color: #666; font-size: 0.9em;">This code will expire in 5 minutes.</p>
          </div>
        </div>
      </div>
    `,
};
