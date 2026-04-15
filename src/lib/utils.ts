import { type ClassValue, clsx } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatPrice(amount: string, currencyCode = 'IDR'): string {
  const num = parseFloat(amount)
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 0,
  }).format(num)
}

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateString))
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function getOrderStatusLabel(status: string): string {
  const map: Record<string, string> = {
    UNFULFILLED: 'Processing',
    PARTIALLY_FULFILLED: 'Partially Shipped',
    FULFILLED: 'Shipped',
    RESTOCKED: 'Returned',
    PENDING_FULFILLMENT: 'Preparing',
    OPEN: 'Open',
    IN_PROGRESS: 'In Progress',
    ON_HOLD: 'On Hold',
    SCHEDULED: 'Scheduled',
  }
  return map[status] ?? status
}
