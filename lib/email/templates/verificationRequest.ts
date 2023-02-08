import { THEME } from "@lib/theme";

const themeSettings = {
  background: "#f9f9f9",
  text: "#444",
  mainBackground: "#fff",
  buttonBackground: THEME.brandColor,
  buttonBorder: THEME.brandColor,
  buttonText: "#fff",
};

// TODO: Replace "Penpal" with logo like below
// <div style="padding-bottom: 20px;"><img src="https://i.ibb.co/Qbnj4mz/logo.png" alt="Company" style="width: 56px;"></div>

/**
 * Verification request HTML template (used for email)
 * @param url Authentication URL (for button)
 * @returns html
 */
export const VERIFICATION_REQUEST_HTML = (url: string) => {
  const { host } = new URL(url);
  const escapedHost = host.replace(/\./g, "&#8203;.");

  return `
  <body style="font-family: Helvetica, Arial, sans-serif; margin: 0px; padding: 0px; background-color: #ffffff;">
    <table role="presentation"
      style="width: 100%; border-collapse: collapse; border: 0px; border-spacing: 0px; font-family: Arial, Helvetica, sans-serif; background-color: rgb(239, 239, 239);">
      <tbody>
        <tr>
          <td align="center" style="padding: 1rem 2rem; vertical-align: top; width: 100%;">
            <table role="presentation" style="max-width: 600px; border-collapse: collapse; border: 0px; border-spacing: 0px; text-align: left;">
              <tbody>
                <tr>
                  <td style="padding: 40px 0px 0px;">
                    <div style="text-align: left;">
                        <h1>Penpal</h1>
                    </div>
                    <div style="padding: 20px; background-color: rgb(255, 255, 255);">
                      <div style="color: rgb(0, 0, 0); text-align: left;">
                        <h1 style="margin: 1rem 0">Final step...</h1>
                        <p style="padding-bottom: 16px">Follow this link to verify your email address.</p>
                        <p style="padding-bottom: 16px">
                            <a href="${url} target="_blank" style="padding: 12px 24px; border-radius: 4px; color: #FFF; background: #3F8EE9;display: inline-block;margin: 0.5rem 0;">
                                Confirm now
                            </a>
                        </p>
                        <p style="padding-bottom: 16px">If you didn’t ask to verify this address, you can ignore this email.</p>
                        <p style="padding-bottom: 16px">Thanks,<br>The Penpal team</p>
                      </div>
                    </div>
                    <div style="padding-top: 20px; color: rgb(153, 153, 153); text-align: center;">
                      <p style="padding-bottom: 16px">Penpal</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </body>`;

  return `
  <body style="background: ${themeSettings.background};">
    <table width="100%" border="0" cellspacing="20" cellpadding="0"
      style="background: ${themeSettings.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
      <tr>
        <td align="center"
          style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${themeSettings.text};">
          Sign in to <strong>${escapedHost}</strong>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding: 20px 0;">
          <table border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td align="center" style="border-radius: 5px;" bgcolor="${themeSettings.buttonBackground}"><a href="${url}"
                  target="_blank"
                  style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${themeSettings.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${themeSettings.buttonBorder}; display: inline-block; font-weight: bold;">Sign
                  in</a></td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td align="center"
          style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${themeSettings.text};">
          If you did not request this email you can safely ignore it.
        </td>
      </tr>
    </table>
  </body>
  `;
};

/**
 * Email Text body (fallback for email clients that don't render HTML, e.g. feature phones)
 * @param url Authentication URL (for button)
 * @returns html
 */
export const VERIFICATION_REQUEST_TEXT = (url: string) => {
  const { host } = new URL(url);
  return `Sign in to ${host}\n${url}\n\n`;
};
