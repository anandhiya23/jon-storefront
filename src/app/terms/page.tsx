import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms & Conditions — JON',
  alternates: { canonical: '/terms' },
}

export default function TermsPage() {
  return (
    <main className="max-w-[720px] mx-auto py-24 px-8 max-sm:px-6">
      <h1 className="type-display mb-4">Terms & Conditions</h1>
      <p className="type-label text-outline mb-16">Last updated: April 2025</p>

      <div className="prose prose-neutral max-w-none flex flex-col gap-10">
        <section>
          <h2 className="type-headline mb-4">1. About These Terms</h2>
          <p className="text-sm leading-[1.8] text-on-surface-variant">
            These terms govern your use of the JON website (jonperformance.id) and purchase of JON products.
            By placing an order you agree to these terms. &quot;JON&quot; refers to PT JON Just One Nation, Jakarta, Indonesia.
          </p>
        </section>

        <section>
          <h2 className="type-headline mb-4">2. Orders & Payment</h2>
          <ul className="text-sm leading-[1.8] text-on-surface-variant flex flex-col gap-2 list-disc pl-5">
            <li>Prices are displayed in Indonesian Rupiah (IDR) and include applicable taxes.</li>
            <li>We accept payment via Shopify Payments. Orders are confirmed only after payment is verified.</li>
            <li>We reserve the right to cancel orders in the event of pricing errors or stock unavailability.</li>
            <li>You will receive an order confirmation email within 15 minutes of a successful payment.</li>
          </ul>
        </section>

        <section>
          <h2 className="type-headline mb-4">3. Shipping</h2>
          <ul className="text-sm leading-[1.8] text-on-surface-variant flex flex-col gap-2 list-disc pl-5">
            <li>Orders placed before 12:00 WIB on working days are processed the same day.</li>
            <li>Standard delivery: 3–5 working days. Express: 1–2 working days.</li>
            <li>Shipping is currently available within Indonesia only.</li>
            <li>JON is not responsible for delays caused by couriers or customs.</li>
          </ul>
        </section>

        <section>
          <h2 className="type-headline mb-4">4. Returns & Exchanges</h2>
          <ul className="text-sm leading-[1.8] text-on-surface-variant flex flex-col gap-2 list-disc pl-5">
            <li>Returns accepted within 14 days of delivery for unworn, unwashed items with original tags attached.</li>
            <li>Sale items marked as &quot;Final Sale&quot; are not eligible for return or exchange.</li>
            <li>To initiate a return, contact us at support@jonperformance.id with your order code.</li>
            <li>Return shipping costs are the customer&apos;s responsibility unless the item is defective.</li>
            <li>Refunds are processed within 5–7 working days after we receive and inspect the item.</li>
          </ul>
        </section>

        <section>
          <h2 className="type-headline mb-4">5. Product Descriptions</h2>
          <p className="text-sm leading-[1.8] text-on-surface-variant">
            We make every effort to display product colours and details accurately. Actual colours may vary slightly
            due to monitor settings. Measurements listed are flat-lay measurements — allow ±1–2 cm variance.
          </p>
        </section>

        <section>
          <h2 className="type-headline mb-4">6. Intellectual Property</h2>
          <p className="text-sm leading-[1.8] text-on-surface-variant">
            All content on this website — including text, images, logos, and design — is the property of JON.
            You may not reproduce, distribute, or use any content without written permission.
          </p>
        </section>

        <section>
          <h2 className="type-headline mb-4">7. Limitation of Liability</h2>
          <p className="text-sm leading-[1.8] text-on-surface-variant">
            JON&apos;s liability is limited to the value of the order in question. We are not liable for indirect,
            consequential, or incidental damages arising from use of our products or website.
          </p>
        </section>

        <section>
          <h2 className="type-headline mb-4">8. Governing Law</h2>
          <p className="text-sm leading-[1.8] text-on-surface-variant">
            These terms are governed by the laws of the Republic of Indonesia.
            Any disputes will be resolved in the courts of Jakarta.
          </p>
        </section>

        <section>
          <h2 className="type-headline mb-4">9. Contact</h2>
          <p className="text-sm leading-[1.8] text-on-surface-variant">
            Questions about these terms? Email{' '}
            <a href="mailto:support@jonperformance.id" className="underline">support@jonperformance.id</a>.
          </p>
        </section>
      </div>
    </main>
  )
}
