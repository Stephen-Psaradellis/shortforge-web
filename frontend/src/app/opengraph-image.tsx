import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { ANVIL_PATHS, ANVIL_VIEWBOX } from '@/components/brand/anvil';
import { SITE } from '@/content/site';

export const alt = `${SITE.name}: ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Satori needs static TTFs. If the files are missing the image still renders
// with its built-in fallback face rather than failing the build.
async function loadFont(file: string) {
  try {
    return await readFile(join(process.cwd(), 'src/assets/fonts', file));
  } catch {
    return null;
  }
}

export default async function OpenGraphImage() {
  const [fraunces, inter] = await Promise.all([
    loadFont('Fraunces-SemiBold.ttf'),
    loadFont('Inter-Regular.ttf'),
  ]);

  const fonts: NonNullable<ConstructorParameters<typeof ImageResponse>[1]>['fonts'] = [];
  if (fraunces) fonts.push({ name: 'Fraunces', data: fraunces, weight: 600, style: 'normal' });
  if (inter) fonts.push({ name: 'Inter', data: inter, weight: 400, style: 'normal' });

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          background: '#f7f3ec',
          color: '#1b1917',
          fontFamily: inter ? 'Inter' : 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <svg width={52} height={52} viewBox={ANVIL_VIEWBOX} fill="#b8562a">
            {ANVIL_PATHS.map((d) => (
              <path key={d} d={d} />
            ))}
          </svg>
          <div style={{ fontFamily: fraunces ? 'Fraunces' : 'serif', fontSize: 40, fontWeight: 600 }}>
            {SITE.name}
          </div>
        </div>

        <div
          style={{
            fontFamily: fraunces ? 'Fraunces' : 'serif',
            fontSize: 92,
            fontWeight: 600,
            lineHeight: 1.02,
            letterSpacing: '-0.02em',
            maxWidth: 1000,
          }}
        >
          A website you own, built by hand.
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            fontSize: 28,
            color: '#57534e',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div>{SITE.tagline}</div>
            <div>Chicago area. From $750, about $12 a year to run.</div>
          </div>
          <div style={{ color: '#b8562a', fontWeight: 600 }}>shortforge.dev</div>
        </div>

        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 14,
            background: '#b8562a',
          }}
        />
      </div>
    ),
    { ...size, fonts },
  );
}
