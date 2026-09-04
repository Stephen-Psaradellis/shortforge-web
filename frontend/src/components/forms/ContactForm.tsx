'use client';

import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { contactSchema, type ContactInput, type Need } from '@/lib/contact-schema';
import { contactPage } from '@/content/contact';
import { SITE } from '@/content/site';

type ContactFormProps = {
  defaultNeed?: Need;
  defaultMessage?: string;
};

const inputCls =
  'w-full rounded-lg border border-line bg-white px-4 py-3 text-ink placeholder:text-ink-mute focus:border-copper focus:outline-hidden focus:ring-2 focus:ring-copper/25';
const labelCls = 'block text-sm font-semibold';

export function ContactForm({ defaultNeed = 'websites', defaultMessage = '' }: ContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [serverError, setServerError] = useState<string | null>(null);
  const startedAt = useRef<number>(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { need: defaultNeed, message: defaultMessage, website: '' },
  });

  async function onSubmit(values: ContactInput) {
    setStatus('sending');
    setServerError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, startedAt: startedAt.current }),
      });
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !body.ok) {
        setServerError(body.error ?? null);
        setStatus('error');
        return;
      }
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div role="status" className="rounded-xl border border-line bg-white p-8 shadow-card">
        <CheckCircle2 size={32} className="text-ok" aria-hidden />
        <h2 className="display-sm mt-4 text-2xl font-semibold">{contactPage.success.title}</h2>
        <p className="mt-2 leading-relaxed text-ink-soft">{contactPage.success.body}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelCls}>
            Name
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            className={`${inputCls} mt-2`}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            {...register('name')}
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-sm text-err">
              {errors.name.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="email" className={labelCls}>
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className={`${inputCls} mt-2`}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            {...register('email')}
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-sm text-err">
              {errors.email.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="phone" className={labelCls}>
            Phone <span className="font-normal text-ink-mute">(optional)</span>
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            className={`${inputCls} mt-2`}
            {...register('phone')}
          />
        </div>
        <div>
          <label htmlFor="business" className={labelCls}>
            Business <span className="font-normal text-ink-mute">(optional)</span>
          </label>
          <input
            id="business"
            type="text"
            autoComplete="organization"
            className={`${inputCls} mt-2`}
            {...register('business')}
          />
        </div>
      </div>

      <fieldset>
        <legend className={labelCls}>What do you need?</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {contactPage.needOptions.map((opt) => (
            <label
              key={opt.value}
              className="flex cursor-pointer flex-col rounded-lg border border-line bg-white p-4 transition-colors has-checked:border-copper has-checked:bg-copper-tint/60 has-focus-visible:ring-2 has-focus-visible:ring-copper/40"
            >
              <span className="flex items-center gap-2.5">
                <input
                  type="radio"
                  value={opt.value}
                  className="h-4 w-4 accent-copper"
                  {...register('need')}
                />
                <span className="font-semibold">{opt.label}</span>
              </span>
              <span className="mt-1.5 pl-[26px] text-sm text-ink-mute">{opt.hint}</span>
            </label>
          ))}
        </div>
        {errors.need && <p className="mt-1.5 text-sm text-err">{errors.need.message}</p>}
      </fieldset>

      <div>
        <label htmlFor="message" className={labelCls}>
          What you sell, and what you want to happen
        </label>
        <textarea
          id="message"
          rows={6}
          className={`${inputCls} mt-2 resize-y`}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
          {...register('message')}
        />
        {errors.message && (
          <p id="message-error" className="mt-1.5 text-sm text-err">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Honeypot. Hidden from people, tempting to bots. */}
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden>
        <label htmlFor="website">Website</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" icon={ArrowRight} disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send it'}
        </Button>
        <p className="text-sm text-ink-mute">No mailing list. Just a reply.</p>
      </div>

      {status === 'error' && (
        <p role="alert" className="rounded-lg border border-err/30 bg-white p-4 text-sm text-err">
          {serverError ?? contactPage.failure}{' '}
          <a href={`mailto:${SITE.email}`} className="font-semibold underline underline-offset-4">
            {SITE.email}
          </a>
        </p>
      )}
    </form>
  );
}
