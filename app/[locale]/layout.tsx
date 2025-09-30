import type { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n';

export const dynamic = 'force-dynamic';
export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
const LOCALES_SET = new Set(locales as readonly string[]);
function isLocale(value: string): value is Locale {
  return LOCALES_SET.has(value);
}
async function getMessagesSafe(locale: Locale) {
  try {
    const mod = await import(`@/messages/${locale}.json`);
    return mod.default;
  } catch {
    return null;
  }
}
export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const messages = await getMessagesSafe(locale);
  if (!messages) notFound();
  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {children}
    </NextIntlClientProvider>
  );
}
