'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { locales } from '@/i18n';

export default function LocaleSwitcher() {
  const pathname = usePathname() || '/';
  const parts = pathname.split('/').filter(Boolean);
  const rest = parts.slice(1).join('/');
  return (
    <div className="flex items-center gap-2">
      {locales.map((l) => (
        <Link
          key={l}
          className="text-sm underline"
          href={`/${l}${rest ? '/' + rest : ''}`}
          prefetch={false}
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
