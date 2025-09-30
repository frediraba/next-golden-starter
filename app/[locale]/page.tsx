'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import HomeView from '@/components/HomeView';

export default function LocalizedHomePage() {
  const t = useTranslations('Home');
  return (
    <>
      <HomeView title={t('title')} cta={t('cta')} />
      <div className="px-6 space-x-3">
        <Link className="underline" href="/en">
          EN
        </Link>
        <Link className="underline" href="/et">
          ET
        </Link>
        <Link className="underline" href="./db-demo">
          DB demo
        </Link>
      </div>
    </>
  );
}
