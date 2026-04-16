'use client'

import { signOut, useSession } from 'next-auth/react'

export default function LogoutButton() {
  const { data: session } = useSession()

  async function handleLogout() {
    // Capture idToken before signOut clears the session cookie
    const idToken = session?.idToken
    await signOut({ redirect: false })
    const params = idToken ? `?id_token=${encodeURIComponent(idToken)}` : ''
    window.location.href = `/api/auth/shopify-logout${params}`
  }

  return (
    <button
      onClick={handleLogout}
      className="type-label text-on-surface bg-none border-none cursor-pointer p-0 text-left"
    >
      Logout
    </button>
  )
}
