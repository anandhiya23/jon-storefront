'use server'

export type ContactResult = { ok: true } | { ok: false; error: string }

export async function submitContact(_: unknown, formData: FormData): Promise<ContactResult> {
  const subject = formData.get('subject') as string
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const orderCode = formData.get('orderCode') as string
  const message = formData.get('message') as string

  if (!name || !email || !message) {
    return { ok: false, error: 'Please fill in all required fields.' }
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRe.test(email)) {
    return { ok: false, error: 'Please enter a valid email address.' }
  }

  // Log to console for now — wire to email service via env vars when ready
  // e.g. RESEND_API_KEY, SMTP_HOST, etc.
  console.log('[JON Contact]', { subject, name, email, orderCode, message, at: new Date().toISOString() })

  // TODO: send via Resend / Nodemailer / Mailchimp Transactional
  // await sendEmail({ to: 'support@jonperformance.id', subject, name, email, message })

  return { ok: true }
}
