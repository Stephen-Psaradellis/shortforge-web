import type { MetadataRoute } from 'next';
import { SITE } from '@/content/site';

const routes: [path: string, priority: number][] = [
  ['/', 1],
  ['/websites', 0.9],
  ['/automation', 0.8],
  ['/contact', 0.8],
  ['/work/chicago-street-markets', 0.7],
  ['/about', 0.6],
  ['/privacy', 0.2],
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map(([path, priority]) => ({
    url: new URL(path, SITE.url).toString(),
    lastModified,
    changeFrequency: 'monthly',
    priority,
  }));
}
