'use server'

import { Resend } from 'resend'

export type ContactResult = { ok: true } | { ok: false; error: string }

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function submitContact(_: unknown, formData: FormData): Promise<ContactResult> {
  const subject = formData.get('subject') as string
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const orderCode = formData.get('orderCode') as string
  const message = formData.get('message') as string

  if (!name || !email || !message) {
    return { ok: false, error: 'Please fill in all required fields.' }
  }

  if (!emailRe.test(email)) {
    return { ok: false, error: 'Please enter a valid email address.' }
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.log('[JON Contact] RESEND_API_KEY not set —', { subject, name, email, orderCode, message })
    return { ok: true }
  }

  const resend = new Resend(apiKey)
  const from = process.env.RESEND_FROM_EMAIL ?? 'JON Support <noreply@jonperformance.id>'

  const { error } = await resend.emails.send({
    from,
    to: 'support@jonperformance.id',
    replyTo: email,
    subject: `[JON Contact] ${subject || 'General inquiry'} — ${name}`,
    text: [
      `From: ${name} <${email}>`,
      `Order Code: ${orderCode || 'N/A'}`,
      `Subject: ${subject || 'General'}`,
      '',
      message,
    ].join('\n'),
  })

  if (error) {
    console.error('[JON Contact] Resend error:', error)
    return { ok: false, error: 'Failed to send message. Please try again or email us directly.' }
  }

  return { ok: true }
}
