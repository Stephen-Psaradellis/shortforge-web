import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactSchema, NEED_LABELS } from '@/lib/contact-schema';
import { rateLimit } from '@/lib/rate-limit';
import { SITE } from '@/content/site';

export const runtime = 'nodejs';

const MAX_BODY_BYTES = 16 * 1024;
const MIN_FILL_MS = 3000;

function fail(message: string, status: number, headers?: HeadersInit) {
  return NextResponse.json({ ok: false, error: message }, { status, headers });
}

export async function POST(req: Request) {
  const declared = Number(req.headers.get('content-length') ?? 0);
  if (declared > MAX_BODY_BYTES) return fail('Message too long.', 413);

  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) return fail('Message too long.', 413);

  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return fail('Bad request.', 400);
  }

  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) return fail('Check the form and try again.', 400);
  const data = parsed.data;

  // Bots: honeypot filled, or the form was submitted faster than a person types.
  if (data.website || (data.startedAt && Date.now() - data.startedAt < MIN_FILL_MS)) {
    return NextResponse.json({ ok: true });
  }

  const ip = (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown';
  const limit = rateLimit(ip);
  if (!limit.ok) {
    return fail('Too many messages in a row. Try again in a few minutes, or just email me.', 429, {
      'Retry-After': String(limit.retryAfterSec),
    });
  }

  const to = process.env.CONTACT_TO_EMAIL || SITE.email;
  const from = process.env.CONTACT_FROM_EMAIL || 'ShortForge <onboarding@resend.dev>';
  const subject = `[shortforge.dev] ${NEED_LABELS[data.need]}: ${data.name}${
    data.business ? ` (${data.business})` : ''
  }`;
  const text = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || '-'}`,
    `Business: ${data.business || '-'}`,
    `Need: ${NEED_LABELS[data.need]}`,
    '',
    data.message,
  ].join('\n');

  const apiKey = process.env.RESEND_API_KEY;
  const dryRun =
    process.env.CONTACT_DRY_RUN === '1' || (!apiKey && process.env.NODE_ENV !== 'production');

  if (dryRun) {
    console.log(`[contact] dry run\nTo: ${to}\nFrom: ${from}\nSubject: ${subject}\n\n${text}`);
    return NextResponse.json({ ok: true, dryRun: true });
  }

  if (!apiKey) {
    console.error('[contact] RESEND_API_KEY is not set');
    return fail('Could not send right now. Email me directly instead.', 502);
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({ from, to, replyTo: data.email, subject, text });

  if (error) {
    console.error('[contact] resend error', error);
    return fail('Could not send right now. Email me directly instead.', 502);
  }

  return NextResponse.json({ ok: true });
}
