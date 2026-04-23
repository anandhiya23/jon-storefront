import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — JON',
  alternates: { canonical: '/privacy' },
}

export default function PrivacyPage() {
  return (
    <main className="max-w-[720px] mx-auto py-24 px-8 max-sm:px-6">
      <h1 className="type-display mb-4">Privacy Policy</h1>
      <p className="type-label text-outline mb-16">Last updated: April 2025</p>

      <div className="prose prose-neutral max-w-none flex flex-col gap-10">
        <section>
          <h2 className="type-headline mb-4">1. Who We Are</h2>
          <p className="text-sm leading-[1.8] text-on-surface-variant">
            JON — Just One Nation (&quot;JON&quot;, &quot;we&quot;, &quot;us&quot;) is a sport apparel brand based in Jakarta, Indonesia.
            This policy explains how we collect, use, and protect your personal data when you interact with our website at jonperformance.id.
          </p>
        </section>

        <section>
          <h2 className="type-headline mb-4">2. What We Collect</h2>
          <ul className="text-sm leading-[1.8] text-on-surface-variant flex flex-col gap-2 list-disc pl-5">
            <li><strong>Account data:</strong> name, email address, password hash</li>
            <li><strong>Order data:</strong> shipping address, order history, payment status (we do not store card numbers)</li>
            <li><strong>Device data:</strong> browser type, IP address, pages visited (via cookies and analytics)</li>
            <li><strong>Communications:</strong> messages you send via our contact form or WhatsApp</li>
          </ul>
        </section>

        <section>
          <h2 className="type-headline mb-4">3. How We Use Your Data</h2>
          <ul className="text-sm leading-[1.8] text-on-surface-variant flex flex-col gap-2 list-disc pl-5">
            <li>Process and fulfill your orders</li>
            <li>Send order confirmations and shipping updates</li>
            <li>Respond to customer support inquiries</li>
            <li>Send marketing emails (only if you opted in — you can unsubscribe anytime)</li>
            <li>Improve our website and product offerings</li>
          </ul>
        </section>

        <section>
          <h2 className="type-headline mb-4">4. Payment Processing</h2>
          <p className="text-sm leading-[1.8] text-on-surface-variant">
            All payments are processed by Shopify Payments. Your card details are transmitted directly to the payment processor
            and are never stored on JON servers.
          </p>
        </section>

        <section>
          <h2 className="type-headline mb-4">5. Cookies</h2>
          <p className="text-sm leading-[1.8] text-on-surface-variant">
            We use cookies to maintain your session, remember your cart, and understand how visitors use our site.
            Essential cookies are required for the store to function. You may disable analytics cookies in your browser settings.
          </p>
        </section>

        <section>
          <h2 className="type-headline mb-4">6. Sharing Your Data</h2>
          <p className="text-sm leading-[1.8] text-on-surface-variant">
            We do not sell your personal data. We share data only with service providers necessary to operate the store:
            Shopify (e-commerce platform), shipping couriers, and email service providers.
            All third parties are contractually bound to protect your data.
          </p>
        </section>

        <section>
          <h2 className="type-headline mb-4">7. Your Rights</h2>
          <p className="text-sm leading-[1.8] text-on-surface-variant">
            You have the right to access, correct, or delete your personal data. To exercise these rights,
            email us at <a href="mailto:support@jonperformance.id" className="underline">support@jonperformance.id</a>.
            We will respond within 14 working days.
          </p>
        </section>

        <section>
          <h2 className="type-headline mb-4">8. Data Retention</h2>
          <p className="text-sm leading-[1.8] text-on-surface-variant">
            We retain order data for 5 years as required by Indonesian tax regulations.
            Account data is kept until you request deletion. Marketing consent records are kept for 3 years.
          </p>
        </section>

        <section>
          <h2 className="type-headline mb-4">9. Contact</h2>
          <p className="text-sm leading-[1.8] text-on-surface-variant">
            Questions about this policy? Contact us at{' '}
            <a href="mailto:support@jonperformance.id" className="underline">support@jonperformance.id</a>{' '}
            or via WhatsApp at{' '}
            <a href="https://wa.me/62811892313" target="_blank" rel="noopener noreferrer" className="underline">+62 811 892 313</a>.
          </p>
        </section>
      </div>
    </main>
  )
}
