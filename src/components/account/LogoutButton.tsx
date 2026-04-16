'use client'

import { signOut } from 'next-auth/react'

export default function LogoutButton() {
  async function handleLogout() {
    // Clear next-auth session, then redirect to Shopify end_session endpoint
    await signOut({ redirect: false })
    window.location.href = '/api/auth/shopify-logout'
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
