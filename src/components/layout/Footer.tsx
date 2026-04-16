import Link from 'next/link'
import Image from 'next/image'

const FOOTER_LINKS = {
  Shop: [
    { href: '/products', label: 'All Products' },
    { href: '/products?collection=new', label: 'New Arrivals' },
    { href: '/products?collection=sale', label: 'Sale' },
  ],
  Support: [
    { href: '/track', label: 'Track Order' },
    { href: '/support', label: 'Contact Us' },
    { href: '/support#faq', label: 'FAQ' },
  ],
  Account: [
    { href: '/account', label: 'My Profile' },
    { href: '/account/orders', label: 'Order History' },
    { href: '/auth/login', label: 'Login' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-primary text-on-primary pt-20 px-8 pb-12">
      <div className="max-w-[1440px] mx-auto">
        {/* Top row */}
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-16 pb-16 border-b border-white/10 max-md:grid-cols-2 max-md:gap-10 max-sm:grid-cols-1 max-sm:gap-8">
          {/* Brand */}
          <div>
            <div className="mb-6">
              <Image src="/JON White.png" alt="JON" width={100} height={40} className="object-contain" />
            </div>
            <p className="text-sm leading-[1.7] text-outline max-w-[280px]">
              Just One Nation. Sport apparel built for precision, performance, and those who move with intent.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <p className="type-label text-outline mb-6">
                {heading}
              </p>
              <ul className="list-none p-0 m-0 flex flex-col gap-[0.875rem]">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-on-primary no-underline text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="flex justify-between items-center pt-8 max-sm:flex-col max-sm:items-start max-sm:gap-4">
          <p className="type-label text-on-surface-variant">
            © {new Date().getFullYear()} JON — Just One Nation
          </p>
          <div className="flex gap-8">
            <Link href="/privacy" className="type-label text-on-surface-variant no-underline">Privacy</Link>
            <Link href="/terms" className="type-label text-on-surface-variant no-underline">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
