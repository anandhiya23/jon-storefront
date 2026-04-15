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
    <footer
      style={{
        backgroundColor: '#000',
        color: '#e2e2e2',
        padding: '5rem 2rem 3rem',
        marginTop: '8rem',
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        {/* Top row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            gap: '4rem',
            paddingBottom: '4rem',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <Image src="/JON White.png" alt="JON" width={100} height={40} style={{ objectFit: 'contain' }} />
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: '#777', maxWidth: '280px' }}>
              Just One Nation. Sport apparel built for precision, performance, and those who move with intent.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <p className="type-label" style={{ color: '#777', marginBottom: '1.5rem' }}>
                {heading}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      style={{ color: '#e2e2e2', textDecoration: 'none', fontSize: '0.875rem' }}
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
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '2rem',
          }}
        >
          <p className="type-label" style={{ color: '#474747' }}>
            © {new Date().getFullYear()} JON — Just One Nation
          </p>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <Link href="/privacy" className="type-label" style={{ color: '#474747', textDecoration: 'none' }}>Privacy</Link>
            <Link href="/terms" className="type-label" style={{ color: '#474747', textDecoration: 'none' }}>Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
