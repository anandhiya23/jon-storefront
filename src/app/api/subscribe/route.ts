import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  const { email } = await req.json().catch(() => ({}))

  if (!email || typeof email !== 'string' || !emailRe.test(email)) {
    return NextResponse.json({ error: 'Invalid email.' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  const audienceId = process.env.RESEND_AUDIENCE_ID

  if (!apiKey || !audienceId) {
    console.warn('[JON Subscribe] RESEND_API_KEY or RESEND_AUDIENCE_ID not set — skipping')
    return NextResponse.json({ ok: true })
  }

  const resend = new Resend(apiKey)
  const { error } = await resend.contacts.create({ email, audienceId, unsubscribed: false })

  if (error) {
    console.error('[JON Subscribe] Resend error:', error)
    return NextResponse.json({ error: 'Failed to subscribe. Try again.' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
