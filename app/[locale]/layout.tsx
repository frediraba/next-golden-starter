import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  return locales.map((l) => ({ locale: l }));
}

async function getMessages(locale: Locale) {
  try {
    return (await import(`@/messages/${locale}.json`)).default;
  } catch {
    return null;
  }
}

/**
 * NB: Next.js validator eeldab, et params.locale on string.
 * Võtame stringi, kontrollime runtime'is, et see on meie toetatud Locale.
 */
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params; // raw string Nextilt

  // Runtime check — lubame ainult toetatud lokaale
  if (!(locales as readonly string[]).includes(raw)) {
    notFound();
  }
  const locale = raw as Locale;

  const messages = await getMessages(locale);
  if (!messages) notFound();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {children}
    </NextIntlClientProvider>
  );
}
