'use client'

import { signIn } from 'next-auth/react'

export default function SignupPage() {
  return (
    <div className="grid grid-cols-2 min-h-[calc(100vh-64px)] max-md:grid-cols-1">
      {/* Left — editorial panel */}
      <div className="bg-on-surface flex items-end p-16 bg-[linear-gradient(160deg,#000_0%,#3b3b3b_100%)] max-md:hidden">
        <h2 className="type-display text-white text-[clamp(2.5rem,4vw,4rem)] m-0 max-w-[480px]">
          Join the nation.<br />Train without limits.
        </h2>
      </div>

      {/* Right — auth panel */}
      <div className="bg-white flex flex-col justify-center items-center p-20 max-md:p-10 max-sm:p-6">
        <div className="w-full max-w-[360px]">
          <p className="text-2xl font-black tracking-[0.15em] mb-4">JON</p>
          <h1 className="type-headline mb-3">Create your account.</h1>
          <p className="text-sm text-on-surface-variant mb-12 leading-[1.6]">
            Join JON to track orders, save addresses, and get early access to new drops.
          </p>

          <button
            onClick={() => signIn('shopify', { callbackUrl: '/account' })}
            className="btn-primary w-full mb-4"
          >
            Continue with Shopify
          </button>

          <p className="text-xs text-outline text-center leading-[1.6]">
            Already have an account? Use the same button — Shopify will sign you in.
          </p>
        </div>
      </div>
    </div>
  )
}
