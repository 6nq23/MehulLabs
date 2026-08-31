'use client';

import { useState } from 'react';

import { ArrowIcon, MagneticButton } from '@/components/ui/MagneticButton';
import { Reveal } from '@/components/ui/Reveal';
import { TextReveal } from '@/components/ui/TextReveal';
import { site, socials } from '@/data/site';

const budgets = ['< $10k', '$10k – $25k', '$25k – $60k', '$60k+'];

export function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="relative bg-canvas py-section">
      <div className="shell">
        <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <div className="flex flex-col gap-8">
            <Reveal>
              <span className="eyebrow-accent">Contact</span>
            </Reveal>

            <TextReveal as="h2" className="text-display-lg text-ink">
              {'Let’s build something {worth} keeping.'}
            </TextReveal>

            <Reveal delay={0.1}>
              <p className="max-w-md leading-relaxed text-ink-muted">
                Placeholder copy. Tell me what is breaking, what you have tried,
                and what &ldquo;working&rdquo; would look like. I reply to
                everything within two working days.
              </p>
            </Reveal>

            <Reveal delay={0.16} className="flex flex-col gap-8 pt-2">
              <div className="flex flex-col gap-1">
                <span className="eyebrow">Email</span>
                <a
                  href={`mailto:${site.email}`}
                  className="group inline-flex w-fit items-center gap-2 font-display text-xl tracking-tight text-ink"
                >
                  {site.email}
                  <span className="h-px w-0 bg-accent transition-all duration-500 ease-premium group-hover:w-6" />
                </a>
              </div>

              <div className="flex flex-col gap-1">
                <span className="eyebrow">Based in</span>
                <span className="font-display text-xl tracking-tight text-ink">
                  {site.location}
                </span>
              </div>

              <div className="flex flex-col gap-3">
                <span className="eyebrow">Elsewhere</span>
                <ul className="flex flex-wrap gap-2">
                  {socials.map((social) => (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex rounded-full border border-line px-4 py-2 text-sm text-ink-muted transition-colors duration-300 hover:border-accent hover:text-accent"
                      >
                        {social.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setSent(true);
              }}
              className="flex flex-col gap-6 rounded-xl3 border border-line bg-surface p-8 lg:p-10"
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="eyebrow">
                  Your name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Jane Doe"
                  className="w-full rounded-xl border border-line bg-canvas px-4 py-3.5 text-[0.9375rem] text-ink outline-none transition-colors duration-300 placeholder:text-ink-faint focus:border-accent"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="eyebrow">
                  Work email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="jane@company.com"
                  className="w-full rounded-xl border border-line bg-canvas px-4 py-3.5 text-[0.9375rem] text-ink outline-none transition-colors duration-300 placeholder:text-ink-faint focus:border-accent"
                />
              </div>

              <fieldset className="flex flex-col gap-3">
                <legend className="eyebrow mb-1">Budget range</legend>
                <div className="flex flex-wrap gap-2">
                  {budgets.map((budget, index) => (
                    <label
                      key={budget}
                      className="cursor-pointer rounded-full border border-line bg-canvas px-4 py-2 text-sm text-ink-muted transition-colors duration-300 hover:border-ink/25 has-[:checked]:border-accent has-[:checked]:bg-accent has-[:checked]:text-white"
                    >
                      <input
                        type="radio"
                        name="budget"
                        value={budget}
                        defaultChecked={index === 1}
                        className="sr-only"
                      />
                      {budget}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="eyebrow">
                  What are you building?
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  placeholder="A short paragraph is plenty."
                  className="w-full resize-none rounded-xl border border-line bg-canvas px-4 py-3.5 text-[0.9375rem] text-ink outline-none transition-colors duration-300 placeholder:text-ink-faint focus:border-accent"
                />
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <MagneticButton type="submit" variant="primary" strength={0.26}>
                  {sent ? 'Message noted' : 'Send enquiry'}
                  <ArrowIcon />
                </MagneticButton>

                <p
                  aria-live="polite"
                  className="text-xs leading-relaxed text-ink-faint"
                >
                  {sent
                    ? 'Demo form — no backend is wired up yet.'
                    : 'Front-end demo. Wire this to your provider of choice.'}
                </p>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
