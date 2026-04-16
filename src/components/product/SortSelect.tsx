'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'

interface SortOption {
  value: string
  label: string
}

interface Props {
  value: string
  options: SortOption[]
}

export default function SortSelect({ value, options }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams)
    params.set('sort', e.target.value)
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <select
      value={value}
      onChange={handleChange}
      className="bg-transparent border-none border-b border-outline rounded-none py-1 font-[inherit] text-[0.75rem] tracking-[0.05em] cursor-pointer"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  )
}
