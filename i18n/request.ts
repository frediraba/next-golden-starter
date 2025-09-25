import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  // Next 15: "locale" võib olla Promise – ootame ära
  const l = typeof locale === 'string' ? locale : await locale;
  const resolved = l ?? 'en';

  return {
    locale: resolved,
    messages: (await import(`../messages/${resolved}.json`)).default,
  };
});
