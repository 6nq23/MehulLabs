import { useEffect, useRef, useState, type SubmitEvent } from 'react';
import { ArrowIcon } from '@/components/ui/MagneticButton';
import {
  needsOrderVolume,
  orderRanges,
  resolveSolutionId,
  solutions,
  solutionSelectionEvent,
  type InterestId,
} from '@/data/commerce';
import { contactEmail, primaryCta, site } from '@/data/site';
import { trackConversion } from '@/lib/analytics';
import { buildEnquiry, getWhatsAppDraftUrl } from '@/lib/enquiry';

export function Contact({ initialInterest = 'not-sure', sectionNumber = '09' }: { initialInterest?: InterestId; sectionNumber?: string }) {
  const [interest, setInterest] = useState<InterestId>(initialInterest);
  const [draft, setDraft] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const started = useRef(false);
  const showVolume = needsOrderVolume(interest);
  const whatsappDraftUrl = draft ? getWhatsAppDraftUrl(draft) : '';

  useEffect(() => {
    function selectSolution(event: Event) {
      const id = resolveSolutionId((event as CustomEvent<unknown>).detail);
      if (id) {
        setInterest(id);
        setDraft('');
        setStatus('');
      }
    }
    const params = new URLSearchParams(window.location.search);
    const campaignSolution = resolveSolutionId(params.get('solution'));
    if (campaignSolution) setInterest(campaignSolution);
    const offer = params.get('offer');
    if (offer === 'pilot') setMessage("I'm interested in the $5,000 paid pilot.");
    if (offer === 'custom') setMessage("I'd like to discuss a custom engagement.");
    window.addEventListener(solutionSelectionEvent, selectSolution);
    return () => window.removeEventListener(solutionSelectionEvent, selectSolution);
  }, []);

  function startForm() {
    if (!started.current) {
      started.current = true;
      trackConversion({ name: 'form_start' });
    }
  }

  function prepareEnquiry(event: SubmitEvent<HTMLFormElement>) {
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
    setStatus('Your message is ready. Review it and send it in WhatsApp. If it didn’t open, use the link below.');
    trackConversion({ name: 'whatsapp_handoff', location: 'form', solution: interest });
    // A null return also occurs with noopener; always provide a fallback link.
    try {
      window.open(getWhatsAppDraftUrl(text), '_blank', 'noopener,noreferrer');
    } catch {
      setStatus('Your message is ready. Open WhatsApp using the link below.');
    }
  }

  async function copyDraft() {
    try {
      await navigator.clipboard.writeText(draft);
      setStatus('Message copied. Paste it into your conversation with Mehul Labs.');
    } catch {
      setStatus('Copy is unavailable here. You can select the message below or open the WhatsApp link.');
    }
  }

  return (
    <section id="contact" className="contact-section section-space" aria-labelledby="contact-title">
      <div className="shell contact-grid">
        <div className="contact-copy">
          <span className="section-label">
            <span>{sectionNumber} /</span> Start the audit
          </span>
          <h2 id="contact-title">
            Which leak is costing<br />
            <span>you the most?</span>
          </h2>
          <p>
            Tell us your brand and where it hurts. We look at your store before we reply, then give you 20 minutes and
            the 3 biggest leaks we can see — ranked, and yours to keep.
          </p>
          <div className="contact-person">
            <span className="contact-initial" aria-hidden="true">
              m.
            </span>
            <div>
              <strong>You are messaging Mehul, not a form inbox.</strong>
              <span>Founder, Mehul Labs</span>
            </div>
          </div>
          <div className="contact-expectation">
            <h3>What happens next</h3>
            <p>
              You send the message. We look at your store before replying. {site.replyWindow}, you get either a time for
              the 20-minute audit or the answer straight on WhatsApp if it is simple. No deck, no discovery series,
              no proposal you did not ask for.
            </p>
          </div>
          {contactEmail && (
            <a className="contact-email text-link" href={'mailto:' + contactEmail}>
              {contactEmail}
              <ArrowIcon />
            </a>
          )}
          <a
            className="contact-whatsapp text-link"
            href={site.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackConversion({ name: 'whatsapp_handoff', location: 'direct' })}
          >
            Prefer to just chat? Open WhatsApp <ArrowIcon />
          </a>
        </div>
        <div>
          <noscript>
            <p className="no-js-contact">
              Use the direct WhatsApp link to start your leak audit.
              {contactEmail && (
                <>
                  {' '}
                  Or email <a href={'mailto:' + contactEmail}>{contactEmail}</a>.
                </>
              )}
            </p>
          </noscript>
          <form
            className="enquiry-form"
            onSubmit={prepareEnquiry}
            onFocusCapture={startForm}
            onChange={() => {
              setDraft('');
              setStatus('');
            }}
          >
            <div className="form-heading">
              <h3>Start my leak audit.</h3>
              <p>Your brand and where it hurts. That is all we need to begin.</p>
            </div>
            <div className="form-field">
              <label htmlFor="brand">
                Brand name or website <span className="field-required">(required)</span>
              </label>
              <input
                id="brand"
                name="brand"
                autoComplete="organization"
                required
                maxLength={200}
                placeholder="Your brand or yourstore.com"
                onInput={event => event.currentTarget.setCustomValidity('')}
              />
            </div>
            <fieldset className="interest-field">
              <legend>Where does it hurt most?</legend>
              <div>
                {solutions.map(solution => (
                  <label key={solution.id}>
                    <input
                      type="radio"
                      name="interest"
                      value={solution.id}
                      checked={interest === solution.id}
                      onChange={() => {
                        setInterest(solution.id);
                        trackConversion({ name: 'solution_select', solution: solution.id, location: 'form' });
                      }}
                    />
                    <span>{solution.label}</span>
                  </label>
                ))}
                <label>
                  <input
                    type="radio"
                    name="interest"
                    value="not-sure"
                    checked={interest === 'not-sure'}
                    onChange={() => {
                      setInterest('not-sure');
                      trackConversion({ name: 'solution_select', solution: 'not-sure', location: 'form' });
                    }}
                  />
                  <span>Help me choose</span>
                </label>
              </div>
            </fieldset>
            {showVolume && (
              <div className="form-field">
                <label htmlFor="volume">
                  Orders a day, roughly <span className="optional">(optional)</span>
                </label>
                <select id="volume" name="volume" defaultValue="">
                  <option value="">Select a range</option>
                  {orderRanges.map(range => (
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <details className="form-context">
              <summary>
                Add a little more context <span>(optional)</span>
              </summary>
              <div className="form-field">
                <label htmlFor="name">
                  Your name <span className="optional">(optional)</span>
                </label>
                <input id="name" name="name" autoComplete="name" maxLength={100} placeholder="What should we call you?" />
              </div>
              <div className="form-field">
                <label htmlFor="message">
                  What would you fix first? <span className="optional">(optional)</span>
                </label>
                <textarea id="message" name="message" rows={3} maxLength={600} placeholder="A sentence or two is plenty." value={message} onChange={event => setMessage(event.currentTarget.value)} />
              </div>
            </details>
            <button type="submit" className="enquiry-submit">
              {primaryCta.label}
              <ArrowIcon />
            </button>
            <ul className="cta-reducers form-reducers" aria-label="What the audit involves">
              {primaryCta.reducers.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="form-privacy">WhatsApp opens with your message ready. Review it and send when you are.</p>
            <p role="status" aria-live="polite" className="form-status">
              {status}
            </p>
            {draft && (
              <div className="enquiry-fallback">
                <a
                  href={whatsappDraftUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link"
                  onClick={() => trackConversion({ name: 'whatsapp_handoff', location: 'fallback', solution: interest })}
                >
                  Open my WhatsApp message <ArrowIcon />
                </a>
                <details>
                  <summary>View or copy the message</summary>
                  <p className="enquiry-draft">{draft}</p>
                  <button type="button" onClick={copyDraft} className="text-link">
                    Copy message
                  </button>
                </details>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
