import { faqs } from '@/data/commerce';

export function Faq() {
  return (
    <section id="faq" className="faq-section section-space" aria-labelledby="faq-title">
      <div className="shell faq-grid">
        <div><span className="section-label"><span>04 /</span> Common questions</span><h2 id="faq-title" className="section-title">Good questions.<br /><span className="muted-heading">Straight answers.</span></h2></div>
        <div className="faq-list">{faqs.map((faq, i) => <details key={faq.question} className="faq-item" name="studio-faq">
          <summary><span className="faq-number">0{i + 1}</span><span>{faq.question}</span><span className="faq-toggle" aria-hidden="true" /></summary><p>{faq.answer}</p>
        </details>)}</div>
      </div>
    </section>
  );
}
