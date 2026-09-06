'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowIcon } from '@/components/ui/MagneticButton';
import { isSolutionId, orderRanges, solutions, solutionSelectionEvent, type InterestId } from '@/data/commerce';
import { contactEmail, site } from '@/data/site';
import { trackConversion } from '@/lib/analytics';
import { buildEnquiry, getWhatsAppDraftUrl } from '@/lib/enquiry';

export function Contact() {
  const [interest, setInterest] = useState<InterestId>('not-sure');
  const [draft, setDraft] = useState('');
  const [status, setStatus] = useState('');
  const started = useRef(false);
  const showVolume = interest === 'infrastructure' || interest === 'cod-voice' || interest === 'not-sure';
  const whatsappDraftUrl = draft ? getWhatsAppDraftUrl(draft) : '';

  useEffect(() => {
    function selectSolution(event: Event) {
      const id = (event as CustomEvent<unknown>).detail;
      if (isSolutionId(id)) {
        setInterest(id);
        setDraft('');
        setStatus('');
      }
    }
    const campaignSolution = new URLSearchParams(window.location.search).get('solution');
    if (isSolutionId(campaignSolution)) setInterest(campaignSolution);
    window.addEventListener(solutionSelectionEvent, selectSolution);
    return () => window.removeEventListener(solutionSelectionEvent, selectSolution);
  }, []);

  function startForm() {
    if (!started.current) {
      started.current = true;
      trackConversion({ name: 'form_start' });
    }
  }

  function prepareEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = new FormData(form);
    const brand = String(fields.get('brand') ?? '').trim();
    if (!brand) {
      const input = form.elements.namedItem('brand') as HTMLInputElement;
      input.setCustomValidity('Please enter your brand name or website.');
      input.reportValidity();
      return;
    }

    const name = String(fields.get('name') ?? '').trim();
    const message = String(fields.get('message') ?? '').trim();
    const volume = showVolume ? String(fields.get('volume') ?? '').trim() : '';
    const text = buildEnquiry({ brand, interest, name, message, volume });

    setDraft(text);
    setStatus('Your draft is ready. Review and send it in WhatsApp. If it didn’t open, use the link below.');
    trackConversion({ name: 'whatsapp_handoff', location: 'form', solution: interest });
    // A null return also occurs with noopener; always provide a fallback link.
    try {
      window.open(getWhatsAppDraftUrl(text), '_blank', 'noopener,noreferrer');
    } catch {
      setStatus('Your draft is ready. Open WhatsApp using the link below.');
    }
  }

  async function copyDraft() {
    try {
      await navigator.clipboard.writeText(draft);
      setStatus('Draft copied. Paste it into your conversation with Mehul Labs.');
    } catch {
      setStatus('Copy is unavailable here. You can select the draft text below or open the WhatsApp link.');
    }
  }

  return (
    <section id="contact" className="contact-section section-space" aria-labelledby="contact-title">
      <div className="shell contact-grid">
        <div className="contact-copy">
          <span className="section-label"><span>05 /</span> Discuss my setup</span>
          <h2 id="contact-title">What&apos;s slowing<br /><span>your D2C brand down?</span></h2>
          <p>Tell us about your brand and where you need help: order operations, COD calls, Meta creatives, or SEO.</p>
          <div className="contact-person"><span className="contact-initial" aria-hidden="true">m.</span><div><strong>Start a conversation with Mehul.</strong><span>Founder, Mehul Labs</span></div></div>
          <div className="contact-expectation"><h3>What happens next?</h3><p>We discuss your current workflow and whether a solution fits. You get clarity on scope, costs, and responsibilities before any implementation.</p></div>
          {contactEmail && <a className="contact-email text-link" href={'mailto:' + contactEmail}>{contactEmail}<ArrowIcon /></a>}
          <a className="contact-whatsapp text-link" href={site.whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackConversion({ name: 'whatsapp_handoff', location: 'direct' })}>Prefer to chat directly? Open WhatsApp <ArrowIcon /></a>
        </div>
        <div>
          <noscript><p className="no-js-contact">Use the direct WhatsApp link to discuss your setup.{contactEmail && <> Or email <a href={'mailto:' + contactEmail}>{contactEmail}</a>.</>}</p></noscript>
          <form className="enquiry-form" onSubmit={prepareEnquiry} onFocusCapture={startForm} onChange={() => { setDraft(''); setStatus(''); }}>
            <div className="form-heading"><h3>Let&apos;s find your starting point.</h3><p>Just your brand and what you need help with.</p></div>
            <div className="form-field">
              <label htmlFor="brand">Brand name or website <span className="field-required">(required)</span></label>
              <input id="brand" name="brand" autoComplete="organization" required maxLength={200} placeholder="Your brand or yourstore.com" onInput={event => event.currentTarget.setCustomValidity('')} />
            </div>
            <fieldset className="interest-field">
              <legend>Where do you need help?</legend>
              <div>
                {solutions.map(solution => <label key={solution.id}><input type="radio" name="interest" value={solution.id} checked={interest === solution.id} onChange={() => { setInterest(solution.id); trackConversion({ name: 'solution_select', solution: solution.id, location: 'form' }); }} /><span>{solution.label}</span></label>)}
                <label><input type="radio" name="interest" value="not-sure" checked={interest === 'not-sure'} onChange={() => { setInterest('not-sure'); trackConversion({ name: 'solution_select', solution: 'not-sure', location: 'form' }); }} /><span>Help me choose</span></label>
              </div>
            </fieldset>
            {showVolume && <div className="form-field"><label htmlFor="volume">Daily order volume <span className="optional">(optional)</span></label><select id="volume" name="volume" defaultValue=""><option value="">Select a range</option>{orderRanges.map(range => <option key={range} value={range}>{range}</option>)}</select></div>}
            <details className="form-context">
              <summary>Add a little more context <span>(optional)</span></summary>
              <div className="form-field"><label htmlFor="name">Your name <span className="optional">(optional)</span></label><input id="name" name="name" autoComplete="name" maxLength={100} placeholder="What should we call you?" /></div>
              <div className="form-field"><label htmlFor="message">What would you like to improve? <span className="optional">(optional)</span></label><textarea id="message" name="message" rows={3} maxLength={600} placeholder="A sentence or two is plenty." /></div>
            </details>
            <button type="submit" className="enquiry-submit">Continue on WhatsApp<ArrowIcon /></button>
            <p className="form-privacy">WhatsApp opens with a draft. Review it and send when you&apos;re ready.</p>
            <p role="status" aria-live="polite" className="form-status">{status}</p>
            {draft && <div className="enquiry-fallback">
              <a href={whatsappDraftUrl} target="_blank" rel="noopener noreferrer" className="text-link" onClick={() => trackConversion({ name: 'whatsapp_handoff', location: 'fallback', solution: interest })}>Open my WhatsApp draft <ArrowIcon /></a>
              <details><summary>View or copy the message</summary><p className="enquiry-draft">{draft}</p><button type="button" onClick={copyDraft} className="text-link">Copy draft</button></details>
            </div>}
          </form>
        </div>
      </div>
    </section>
  );
}
