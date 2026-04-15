import Link from 'next/link'

const ACCOUNT_NAV = [
  { href: '/account', label: 'Profile' },
  { href: '/account/orders', label: 'Order History' },
  { href: '/track', label: 'Track Order' },
  { href: '/auth/login', label: 'Logout' },
]

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 5rem', display: 'grid', gridTemplateColumns: '220px 1fr', gap: '5rem' }}>
      {/* Sidebar */}
      <nav>
        <p className="type-label" style={{ color: '#777', marginBottom: '2rem' }}>My Account</p>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {ACCOUNT_NAV.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="type-label"
                style={{ color: '#1b1b1b', textDecoration: 'none' }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Content */}
      <div>{children}</div>
    </div>
  )
}
