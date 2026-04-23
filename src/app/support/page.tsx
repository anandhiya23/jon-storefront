import type { Metadata } from 'next'
import ContactForm from './ContactForm'

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
    <div className="max-w-[1200px] mx-auto py-24 px-20 max-md:px-10 max-sm:px-6">
      <div className="grid grid-cols-2 gap-32 items-start max-md:grid-cols-1 max-md:gap-16">
        {/* Left */}
        <div>
          <h1 className="type-display mb-12 text-[clamp(2.5rem,4vw,3.5rem)]">
            Get in Touch
          </h1>

          {/* Channels */}
          <div className="mb-16 flex flex-col gap-8">
            <div>
              <p className="type-label text-outline mb-[0.4rem]">Email</p>
              <p className="font-semibold m-0">support@jonperformance.id</p>
              <p className="text-[0.8125rem] text-on-surface-variant mt-1">
                Typical response within 12–24 hours
              </p>
            </div>
            <div>
              <p className="type-label text-outline mb-[0.4rem]">WhatsApp</p>
              <a
                href="https://wa.me/62811892313"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-on-surface no-underline hover:underline"
              >
                +62 811 892 313
              </a>
              <p className="text-[0.8125rem] text-on-surface-variant mt-1">
                Mon – Sat, 09:00 – 18:00 WIB
              </p>
            </div>
          </div>

          {/* FAQ */}
          <div>
            <p className="type-label mb-6">FAQ</p>
            <div className="flex flex-col">
              {FAQ.map((item, i) => (
                <details key={i} className="border-t border-surface-high py-5">
                  <summary className="font-semibold text-[0.9375rem] cursor-pointer list-none flex justify-between select-none">
                    {item.q}
                    <span className="font-normal text-outline ml-4 shrink-0">+</span>
                  </summary>
                  <p className="text-sm text-on-surface-variant leading-[1.7] mt-4 mb-0">
                    {item.a}
                  </p>
                </details>
              ))}
              <div className="border-t border-surface-high" />
            </div>
          </div>
        </div>

        {/* Right — Contact form */}
        <div>
          <p className="type-label mb-10">Send a Message</p>
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
