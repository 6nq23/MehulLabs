import { ArrowIcon } from '@/components/ui/MagneticButton';
import { contactEmail, primaryCta, site } from '@/data/site';

export function Contact({ sectionNumber = '06' }: { sectionNumber?: string }) {
  return (
    <section id="contact" className="contact-section section-space" aria-labelledby="contact-title">
      <div className="shell contact-grid">
        <div className="contact-copy">
          <span className="section-label"><span>{sectionNumber} /</span> Book your audit</span>
          <h2 id="contact-title">What would you<br /><span>fix first?</span></h2>
          <p>Book a free 30-minute call with Mehul to discuss your store, operations or AI workflows. We’ll review the problem and recommend practical next steps.</p>
          <div className="contact-person">
            <span className="contact-initial" aria-hidden="true">m.</span>
            <div><strong>Speak directly with Mehul.</strong><span>Founder, mlabs Growth</span></div>
          </div>
          <div className="contact-expectation">
            <h3>What happens next</h3>
            <p>Choose an available time on Calendly and complete the booking there. Bring your website, the tools you use, and the problem you want to solve. Any paid work starts with a separate written scope.</p>
          </div>
          {contactEmail && <a className="contact-email text-link" href={'mailto:' + contactEmail}>{contactEmail}<ArrowIcon /></a>}
          <a className="contact-whatsapp text-link" href={site.whatsappUrl} target="_blank" rel="noopener noreferrer">Prefer a message? Chat on WhatsApp <ArrowIcon /></a>
        </div>
        <div className="growth-card">
          <p className="eyebrow-accent">FREE · 30 MINUTES</p>
          <h3>Pick a time that works for you.</h3>
          <p className="growth-note">Audit calls, service discussions and product calls are booked through the same calendar.</p>
          <a href={site.bookingUrl} className="growth-button" data-cta-location="contact-booking" style={{ marginTop: '1.5rem' }}>{primaryCta.label}<ArrowIcon /></a>
          <ul className="cta-reducers" aria-label="What the call involves" style={{ justifyContent: 'flex-start' }}>
            {primaryCta.reducers.map(item => <li key={item}>{item}</li>)}
          </ul>
          <p className="growth-note">You’ll continue to Calendly to select a time and confirm your booking.</p>
        </div>
      </div>
    </section>
  );
}
