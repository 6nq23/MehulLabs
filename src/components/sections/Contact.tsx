'use client';

import { useState, type FormEvent } from 'react';
import { ArrowIcon } from '@/components/ui/MagneticButton';
import { contactEmail } from '@/data/site';

const interests = ['Product Research', 'SEO Automation', 'Ads Analysis', 'AI Operations', 'AI Calling & WhatsApp', 'All-in-one', 'Let\u2019s figure it out'];

export function Contact() {
  const [brief, setBrief] = useState('');
  const [status, setStatus] = useState('');

  function prepareEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const text = [
      'New enquiry — Mehul Labs', '',
      'Name: ' + String(fields.get('name') ?? '').trim(),
      'Email: ' + String(fields.get('email') ?? '').trim(),
      'Brand / website: ' + String(fields.get('brand') ?? '').trim(),
      'Interested in: ' + String(fields.get('interest') ?? 'Let\u2019s figure it out'),
      '', String(fields.get('message') ?? '').trim(),
    ].join('\n');
    setBrief(text);
    setStatus('Opening WhatsApp...');
    window.open(`https://wa.me/919426016918?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  }

  return (
    <section id="contact" className="contact-section section-space" aria-labelledby="contact-title">
      <div className="shell contact-grid">
        <div className="contact-copy">
          <span className="section-label"><span>05 /</span> Let&apos;s get started</span>
          <h2 id="contact-title">Ready to<br />grow your<br /><span>D2C brand?</span></h2>
          <p>Pick a service, go all-in, or just tell us where you&apos;re stuck. We&apos;ll figure out the right setup together.</p>
          <div className="contact-person"><span className="contact-initial" aria-hidden="true">m.</span><div><strong>Start a conversation with Mehul Labs.</strong><span>Real founders. Real support. Real growth.</span></div></div>
          {contactEmail && <a className="contact-email text-link" href={'mailto:' + contactEmail}>{contactEmail}<ArrowIcon /></a>}
          <a className="contact-whatsapp text-link" href="https://wa.me/919426016918" target="_blank" rel="noopener noreferrer" style={{ marginTop: '0.5rem' }}>Chat on WhatsApp <ArrowIcon /></a>
        </div>
        <noscript><p>Please enable JavaScript to prepare an enquiry.{contactEmail && <>Or email <a href={'mailto:' + contactEmail}>{contactEmail}</a>.</>}</p></noscript>
        <form className="enquiry-form" onSubmit={prepareEnquiry} onChange={() => { if (brief) { setBrief(''); setStatus(''); } }}>
          <div className="form-heading"><h3>Tell us about your brand.</h3><p>No perfect brief needed. Just a place to start.</p></div>
          <div className="form-row">
            <div className="form-field"><label htmlFor="name">Your name <span>*</span></label><input id="name" name="name" autoComplete="name" required maxLength={100} placeholder="What should we call you?" /></div>
            <div className="form-field"><label htmlFor="email">Email address <span>*</span></label><input id="email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@yourbrand.com" /></div>
          </div>
          <div className="form-field"><label htmlFor="brand">Brand name or website <span className="optional">Optional</span></label><input id="brand" name="brand" autoComplete="organization" maxLength={200} placeholder="Introduce us to your brand" /></div>
          <fieldset className="interest-field"><legend>What are you interested in?</legend><div>{interests.map((interest, index) => <label key={interest}><input type="radio" name="interest" value={interest} defaultChecked={index === interests.length - 1} /><span>{interest}</span></label>)}</div></fieldset>
          <div className="form-field"><label htmlFor="message">What&apos;s on your mind? <span>*</span></label><textarea id="message" name="message" rows={3} required minLength={10} maxLength={4000} placeholder="Tell us about your brand and what you need help with." /></div>
          <button type="submit" className="enquiry-submit">Send via WhatsApp<ArrowIcon /></button>
          <p className="form-privacy">We&apos;ll open WhatsApp for you to review and send the message.</p>
          <p role="status" aria-live="polite" className="form-status">{status}</p>
        </form>
      </div>
    </section>
  );
}
