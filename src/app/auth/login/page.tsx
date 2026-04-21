'use client'

import Image from 'next/image'
import { signIn } from 'next-auth/react'

export default function LoginPage() {
  return (
    <div className="grid grid-cols-2 min-h-[calc(100vh-64px)] max-md:grid-cols-1">
      {/* Left — editorial panel */}
      <div className="relative overflow-hidden max-md:hidden">
        <Image
          src="/manrunning.png"
          alt=""
          fill
          sizes="50vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 p-16">
          <h2 className="type-display text-white text-[clamp(2.5rem,4vw,4rem)] m-0 max-w-[480px]">
            Move with intent.<br />Perform with precision.
          </h2>
        </div>
      </div>

      {/* Right — auth panel */}
      <div className="bg-white flex flex-col justify-center items-center p-20 max-md:p-10 max-sm:p-6">
        <div className="w-full max-w-[360px]">
          <Image src="/JON Black.png" alt="JON" width={72} height={28} className="object-contain mb-4" />
          <h1 className="type-headline mb-3">Welcome back.</h1>
          <p className="text-sm text-on-surface-variant mb-12 leading-[1.6]">
            Sign in to your account to view orders, manage your profile, and more.
          </p>

          <button
            onClick={() => signIn('shopify', { callbackUrl: '/account' })}
            className="btn-primary w-full mb-4"
          >
            Continue with Shopify
          </button>

          <p className="text-xs text-outline text-center leading-[1.6]">
            New customers can create an account during sign‑in.
          </p>
        </div>
      </div>
    </div>
  )
}
