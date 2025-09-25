'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function LocalizedHomePage() {
  const t = useTranslations('Home');
  return (
    <main className="p-6 space-y-3">
      <h1 className="text-3xl font-bold">{t('title')}</h1>
      <p className="text-gray-600">{t('cta')}</p>
      <div className="space-x-3">
        <Link className="underline" href="/en">
          EN
        </Link>
        <Link className="underline" href="/et">
          ET
        </Link>
      </div>
    </main>
  );
}
