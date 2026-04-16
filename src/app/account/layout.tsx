import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { authOptions } from '@/lib/auth'
import LogoutButton from '@/components/account/LogoutButton'

const ACCOUNT_NAV = [
  { href: '/account', label: 'Profile' },
  { href: '/account/orders', label: 'Order History' },
  { href: '/track', label: 'Track Order' },
]

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/auth/login')

  return (
    <div className="max-w-[1200px] mx-auto py-16 px-20 grid grid-cols-[220px_1fr] gap-20 max-md:grid-cols-1 max-md:px-10 max-md:gap-10 max-sm:px-6">
      {/* Sidebar */}
      <nav>
        <p className="type-label text-outline mb-2">My Account</p>
        <p className="text-sm text-on-surface-variant mb-8">{session.user?.name ?? session.user?.email}</p>
        <ul className="list-none p-0 m-0 flex flex-col gap-6">
          {ACCOUNT_NAV.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="type-label text-on-surface no-underline"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <LogoutButton />
          </li>
        </ul>
      </nav>

      {/* Content */}
      <div>{children}</div>
    </div>
  )
}
