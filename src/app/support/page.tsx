import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact & Support',
  alternates: { canonical: '/support' },
}

const FAQ = [
  {
    q: 'When will my order ship?',
    a: 'Orders placed before 12:00 WIB are processed the same day. Standard delivery takes 3–5 working days. Express takes 1–2 working days.',
  },
  {
    q: 'How do I process a return?',
    a: 'We accept returns within 14 days of delivery for unworn, unwashed items with original tags. Contact us via email or WhatsApp to initiate a return.',
  },
  {
    q: 'How do I find my size?',
    a: 'Check our size guide on each product page. JON fits true to size. For between sizes, we recommend sizing up for a relaxed fit.',
  },
  {
    q: 'Do you ship internationally?',
    a: 'Currently we ship within Indonesia. International shipping is coming soon — sign up for updates.',
  },
  {
    q: 'Can I change or cancel my order?',
    a: 'Orders can be changed or cancelled within 1 hour of placement. After that, they enter fulfillment and cannot be modified.',
  },
]

export default function SupportPage() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '6rem 5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8rem', alignItems: 'start' }}>
        {/* Left */}
        <div>
          <h1
            className="type-display"
            style={{
              marginBottom: '3rem',
              fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
            }}
          >
            Get in Touch
          </h1>

          {/* Channels */}
          <div style={{ marginBottom: '4rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <p className="type-label" style={{ color: '#777', marginBottom: '0.4rem' }}>Email</p>
              <p style={{ fontWeight: 600, margin: 0 }}>support@jonperformance.id</p>
              <p style={{ fontSize: '0.8125rem', color: '#474747', margin: '0.25rem 0 0' }}>
                Typical response within 12–24 hours
              </p>
            </div>
            <div>
              <p className="type-label" style={{ color: '#777', marginBottom: '0.4rem' }}>WhatsApp</p>
              <p style={{ fontWeight: 600, margin: 0 }}>+62 811 892 313</p>
              <p style={{ fontSize: '0.8125rem', color: '#474747', margin: '0.25rem 0 0' }}>
                Mon – Sat, 09:00 – 18:00 WIB
              </p>
            </div>
          </div>

          {/* FAQ */}
          <div>
            <p className="type-label" style={{ marginBottom: '1.5rem' }}>FAQ</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {FAQ.map((item, i) => (
                <details
                  key={i}
                  style={{
                    borderTop: '1px solid #e8e8e8',
                    padding: '1.25rem 0',
                  }}
                >
                  <summary
                    style={{
                      fontWeight: 600,
                      fontSize: '0.9375rem',
                      cursor: 'pointer',
                      listStyle: 'none',
                      display: 'flex',
                      justifyContent: 'space-between',
                      userSelect: 'none',
                    }}
                  >
                    {item.q}
                    <span style={{ fontWeight: 400, color: '#777', marginLeft: '1rem', flexShrink: 0 }}>+</span>
                  </summary>
                  <p style={{ fontSize: '0.875rem', color: '#474747', lineHeight: 1.7, marginTop: '1rem', marginBottom: 0 }}>
                    {item.a}
                  </p>
                </details>
              ))}
              <div style={{ borderTop: '1px solid #e8e8e8' }} />
            </div>
          </div>
        </div>

        {/* Right — Contact form */}
        <div>
          <p className="type-label" style={{ marginBottom: '2.5rem' }}>Send a Message</p>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <label className="type-label" style={{ display: 'block', color: '#474747', marginBottom: '0.5rem' }}>
                Subject
              </label>
              <select
                className="input-line"
                style={{ cursor: 'pointer' }}
              >
                <option value="">Select a topic</option>
                <option value="order">Order Inquiry</option>
                <option value="returns">Returns & Exchanges</option>
                <option value="general">General</option>
                <option value="press">Press & Collaboration</option>
              </select>
            </div>

            <div>
              <label className="type-label" style={{ display: 'block', color: '#474747', marginBottom: '0.5rem' }}>
                Full Name
              </label>
              <input className="input-line" placeholder="Your name" required />
            </div>

            <div>
              <label className="type-label" style={{ display: 'block', color: '#474747', marginBottom: '0.5rem' }}>
                Email Address
              </label>
              <input className="input-line" type="email" placeholder="your@email.com" required />
            </div>

            <div>
              <label className="type-label" style={{ display: 'block', color: '#474747', marginBottom: '0.5rem' }}>
                Order Code <span style={{ color: '#777', fontWeight: 400 }}>(optional)</span>
              </label>
              <input className="input-line" placeholder="JON-2025-00042" />
            </div>

            <div>
              <label className="type-label" style={{ display: 'block', color: '#474747', marginBottom: '0.5rem' }}>
                Message
              </label>
              <textarea
                className="input-line"
                placeholder="Tell us how we can help..."
                rows={5}
                style={{ resize: 'vertical' }}
              />
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
