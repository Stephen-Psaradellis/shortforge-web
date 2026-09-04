import type { Metadata } from 'next';
import { SITE } from '@/content/site';

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
};

export function pageMetadata({ title, description, path, noindex = false }: PageMetadataInput): Metadata {
  const url = new URL(path, SITE.url).toString();
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} — ${SITE.name}`,
      description,
      url,
      siteName: SITE.name,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} — ${SITE.name}`,
      description,
    },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  };
}
