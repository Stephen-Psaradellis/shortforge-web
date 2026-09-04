/* eslint-disable @next/next/no-img-element */
import type { CSSProperties, ReactNode } from 'react';
import { SITE } from '@/content/site';
import {
  addons,
  aiAddons,
  included,
  ongoing,
  packages,
  proof,
  steps,
} from '@/content/websites';

// A one-sheet Letter leaflet built from the same content as /websites, so the
// PDF can never drift from the page. Sizes are in pt because this only ever
// lands on paper.

const INK = '#1b1917';
const SOFT = '#57534e';
const MUTE = '#8a8378';
const LINE = '#ddd6cb';
const COPPER = '#b8562a';

const sans = 'var(--font-inter), -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
const display = 'var(--font-fraunces), Georgia, serif';

function H({ children }: { children: ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: sans,
        fontSize: '8.6pt',
        fontWeight: 700,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: COPPER,
        margin: '0 0 5pt',
      }}
    >
      {children}
    </h2>
  );
}

const row: CSSProperties = { display: 'flex', justifyContent: 'space-between', gap: '6pt' };

export function Leaflet() {
  return (
    <div
      className="leaflet-sheet"
      style={{ fontFamily: sans, color: INK, fontSize: '8.4pt', lineHeight: 1.4 }}
    >
      {/* Masthead */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          borderBottom: `2pt solid ${INK}`,
          paddingBottom: '6pt',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: display,
              fontVariationSettings: '"opsz" 72, "SOFT" 30',
              fontSize: '21pt',
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: '-0.01em',
            }}
          >
            Your website should cost $12 a year.
          </div>
          <div style={{ fontSize: '9.5pt', marginTop: '3pt', color: SOFT }}>
            {SITE.owner} · Websites for small businesses · Chicago
          </div>
        </div>
        <div style={{ textAlign: 'right', fontSize: '8pt', color: SOFT }}>
          <div style={{ fontWeight: 600, color: INK }}>{SITE.email}</div>
          <div>{SITE.phone}</div>
          <div style={{ color: COPPER, fontWeight: 600 }}>shortforge.dev/websites</div>
        </div>
      </div>

      <p style={{ margin: '8pt 0 10pt', fontSize: '9pt', lineHeight: 1.5 }}>
        I&apos;m a software engineer in Chicago. For seven years I&apos;ve built systems for
        global banks, and I&apos;m currently a contract developer at PepsiCo. On the side I
        build websites for small businesses: fast, simple, and yours outright. No monthly platform bill, and <strong>about $12 a year</strong> to keep
        online.
      </p>

      {/* Two columns */}
      <div style={{ display: 'flex', gap: '18pt', alignItems: 'flex-start' }}>
        {/* Left */}
        <div style={{ flex: '1.15 1 0', minWidth: 0 }}>
          <H>What every site comes with</H>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              columnGap: '12pt',
              rowGap: '5pt',
              marginBottom: '11pt',
            }}
          >
            {included.map((i) => (
              <div key={i.title}>
                <div style={{ fontWeight: 700 }}>{i.title}</div>
                <div style={{ color: SOFT, fontSize: '7.8pt' }}>{i.body}</div>
              </div>
            ))}
          </div>

          <H>How it works</H>
          <ol style={{ margin: '0 0 11pt', paddingLeft: '13pt' }}>
            {steps.map((s) => (
              <li key={s.n} style={{ marginBottom: '3pt' }}>
                <strong>{s.title}.</strong> <span style={{ color: SOFT }}>{s.body}</span>
              </li>
            ))}
          </ol>

          <H>Recent work</H>
          <div style={{ display: 'flex', gap: '9pt', alignItems: 'flex-start' }}>
            <img
              src={proof.images.desktop.src}
              alt="Chicago Street Markets homepage"
              style={{ width: '150pt', border: `0.75pt solid ${LINE}`, borderRadius: '3pt' }}
            />
            <div style={{ color: SOFT }}>
              <strong style={{ color: INK }}>{SITE.proofName}</strong>: three weekly farmers
              markets in Joliet, New Lenox and Lockport. Nine pages, a full event calendar,
              vendor applications and a mailing list. Moved off a one-page Squarespace site;
              now runs for about $12 a year, entirely in the owner&apos;s own accounts.
            </div>
          </div>
        </div>

        {/* Right */}
        <div
          style={{
            flex: '0.85 1 0',
            minWidth: 0,
            borderLeft: `0.75pt solid ${LINE}`,
            paddingLeft: '14pt',
          }}
        >
          <H>What it costs</H>
          {packages.map((p) => (
            <div key={p.name} style={{ marginBottom: '7pt' }}>
              <div style={row}>
                <span style={{ fontWeight: 700 }}>{p.name}</span>
                <span style={{ fontWeight: 700, fontSize: '10pt', fontVariantNumeric: 'tabular-nums' }}>
                  {p.price}
                </span>
              </div>
              <div style={{ color: SOFT, fontSize: '7.8pt' }}>
                {p.tagline} {p.turnaround}.
              </div>
            </div>
          ))}
          <p style={{ margin: '0 0 11pt', fontSize: '7.6pt', color: MUTE }}>
            Vendor rate, 15% off, for anyone selling at Chicago Street Markets. Half up front,
            half at launch.
          </p>

          <H>After it&apos;s live</H>
          <div style={{ marginBottom: '11pt' }}>
            {ongoing.map((o) => (
              <div key={o.name} style={row}>
                <span>
                  {o.name}
                  {o.featured && (
                    <span style={{ color: COPPER, fontWeight: 600 }}> &middot; first year included</span>
                  )}
                </span>
                <span style={{ fontWeight: 700 }}>{o.price}</span>
              </div>
            ))}
            <div style={{ fontSize: '7.6pt', color: MUTE, marginTop: '2pt' }}>
              Anything else is $110/hr. Nothing renews on its own.
            </div>
          </div>

          <H>Add-ons</H>
          <div style={{ marginBottom: '11pt' }}>
            {[...addons.slice(0, 5), aiAddons[0]].map(([label, price]) => (
              <div key={label} style={row}>
                <span style={{ color: SOFT }}>{label}</span>
                <span style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>{price}</span>
              </div>
            ))}
          </div>

          <H>Worth knowing up front</H>
          <p style={{ margin: 0, color: SOFT }}>
            Photos and copy are due within two weeks of starting. If a project goes quiet for
            a month it gets paused, and restarting is $250. It is the one thing that decides
            whether a site takes three weeks or three months.
          </p>
          <p style={{ margin: '5pt 0 0', color: SOFT }}>
            If a website builder is genuinely the better fit for you, I will say so on the
            first call.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          borderTop: `0.75pt solid ${LINE}`,
          marginTop: '10pt',
          paddingTop: '6pt',
          fontSize: '7.8pt',
          color: MUTE,
          display: 'flex',
          justifyContent: 'space-between',
          gap: '12pt',
        }}
      >
        <span>
          <strong style={{ color: INK }}>You own all of it</strong>: the domain, the hosting
          account, the code. Registered in your name, handed over at launch.
        </span>
        <span style={{ whiteSpace: 'nowrap', fontWeight: 600, color: INK }}>
          {SITE.email} · {SITE.phone}
        </span>
      </div>
    </div>
  );
}
