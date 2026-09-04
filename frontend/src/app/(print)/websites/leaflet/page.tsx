import type { Metadata } from 'next';
import { Leaflet } from '@/components/leaflet/Leaflet';
import '@/components/leaflet/leaflet.css';

export const metadata: Metadata = {
  title: 'Websites leaflet',
  robots: { index: false, follow: false },
};

// Printed to public/shortforge-websites.pdf by scripts/make-leaflet-pdf.py.
export default function LeafletPage() {
  return <Leaflet />;
}
