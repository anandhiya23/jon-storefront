'use client'

import { useActionState } from 'react'
import { submitContact, type ContactResult } from './actions'

const initialState: ContactResult | null = null

export default function ContactForm() {
  const [result, action, pending] = useActionState(submitContact, initialState)

  if (result?.ok) {
    return (
      <div className="py-12">
        <p className="type-label text-outline mb-4">Message sent.</p>
        <p className="font-semibold text-[1.1rem] mb-3">We&apos;ll be in touch.</p>
        <p className="text-sm text-on-surface-variant leading-[1.8]">
          Expect a reply within 12–24 hours at your email address.
        </p>
      </div>
    )
  }

  return (
    <form action={action} className="flex flex-col gap-8">
      <div>
        <label htmlFor="subject" className="type-label block text-on-surface-variant mb-2">
          Subject
        </label>
        <select id="subject" name="subject" className="input-line cursor-pointer">
          <option value="">Select a topic</option>
          <option value="order">Order Inquiry</option>
          <option value="returns">Returns & Exchanges</option>
          <option value="general">General</option>
          <option value="press">Press & Collaboration</option>
        </select>
      </div>

      <div>
        <label htmlFor="name" className="type-label block text-on-surface-variant mb-2">
          Full Name
        </label>
        <input id="name" name="name" className="input-line" placeholder="Your name" required />
      </div>

      <div>
        <label htmlFor="email" className="type-label block text-on-surface-variant mb-2">
          Email Address
        </label>
        <input id="email" name="email" className="input-line" type="email" placeholder="your@email.com" required />
      </div>

      <div>
        <label htmlFor="orderCode" className="type-label block text-on-surface-variant mb-2">
          Order Code <span className="text-outline font-normal">(optional)</span>
        </label>
        <input id="orderCode" name="orderCode" className="input-line" placeholder="JON-2025-00042" />
      </div>

      <div>
        <label htmlFor="message" className="type-label block text-on-surface-variant mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          className="input-line resize-y"
          placeholder="Tell us how we can help..."
          rows={5}
          required
        />
      </div>

      {result && !result.ok && (
        <p className="text-sm text-red-600">{result.error}</p>
      )}

      <button type="submit" disabled={pending} className="btn-primary w-full mt-2 disabled:opacity-50 disabled:cursor-not-allowed">
        {pending ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  )
}
