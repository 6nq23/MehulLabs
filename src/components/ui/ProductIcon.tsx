import type { Product } from '@/data/products';
import { cn } from '@/lib/utils';

const paths: Record<Product['icon'], React.ReactNode> = {
  voice: (
    <>
      <rect x="9" y="2.5" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3.5" />
    </>
  ),
  cart: (
    <>
      <path d="M2.5 3h2.2l2.1 11.2a1.6 1.6 0 0 0 1.6 1.3h8.4a1.6 1.6 0 0 0 1.6-1.3L19.8 7H6" />
      <circle cx="9.5" cy="20" r="1.4" />
      <circle cx="17" cy="20" r="1.4" />
    </>
  ),
  boxes: (
    <>
      <path d="M12 2.5 21 7v10l-9 4.5L3 17V7z" />
      <path d="M3 7l9 4.5L21 7M12 11.5V21.5" />
    </>
  ),
  support: (
    <>
      <path d="M21 12a9 9 0 1 0-3.4 7.05L21 20.5z" />
      <path d="M9.2 9.6a2.9 2.9 0 0 1 5.6 1c0 1.9-2.8 2.4-2.8 2.4M12 17h.01" />
    </>
  ),
  sales: (
    <>
      <path d="M3 17.5 9.5 11l4 4L21 7" />
      <path d="M15.5 7H21v5.5" />
    </>
  ),
  analytics: (
    <>
      <path d="M3 3v16.5A1.5 1.5 0 0 0 4.5 21H21" />
      <path d="M7.5 16v-4M12 16V8.5M16.5 16v-6.5M21 16V5.5" />
    </>
  ),
};

export function ProductIcon({
  name,
  className,
}: {
  name: Product['icon'];
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn('h-full w-full', className)}
    >
      {paths[name]}
    </svg>
  );
}
