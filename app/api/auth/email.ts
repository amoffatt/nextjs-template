import { SendVerificationRequestParams } from "next-auth/providers/email"
import { createTransport } from "nodemailer"

export async function sendVerificationRequest(params:SendVerificationRequestParams) {
  const { identifier, url, provider, theme } = params
  const { host } = new URL(url)
  const transport = createTransport(provider.server)
  const result = await transport.sendMail({
    to: identifier,
    from: provider.from,
    subject: `Sign in to ${host}`,
    text: text({url}),
    html: html({url}),
  })
  const failed = result.rejected.concat(result.pending).filter(Boolean)
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`)
  }
}

interface MagicLinkTemplateParams {
  url: string
}

export function html({url}: MagicLinkTemplateParams) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sign In - Magic Link</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background-color: #4F46E5;
      text-align: center;
      padding: 20px;
      color: white;
      font-size: 24px;
      font-weight: bold;
    }
    .content {
      padding: 20px 0;
    }
    .button {
      display: inline-block;
      background-color: #4F46E5;
      color: white;
      text-decoration: none;
      padding: 10px 20px;
      border-radius: 3px;
      font-weight: bold;
    }
    .footer {
      font-size: 14px;
      color: #666;
      text-align: center;
      margin-top: 20px;
      border-top: 1px solid #eee;
      padding-top: 20px;
    }
  </style>
</head>
<body>
  <div class="header">
    Welcome
  </div>
  <div class="content">
    <p>Hello! You requested to sign in to your account.</p>
    <p>Click the button below to sign in. This link will expire after one use.</p>
    <p style="text-align: center;">
      <a href="${url}" class="button">Sign In</a>
    </p>
  </div>
  <div class="footer">
    If you didn't request this email, you can safely ignore it.
  </div>
</body>
</html>`
}

export function text({url}: MagicLinkTemplateParams) {
  return `
Sign In

Hello! You requested to sign in to your account.

Click the link below to sign in. This link will expire after one use:

${url}

If you didn't request this email, you can safely ignore it.
  `.trim()
}