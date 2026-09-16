import { ArrowIcon } from '@/components/ui/MagneticButton';
import { navLinks, site } from '@/data/site';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-top"><p>Practical AI workflows. Built around the work.</p><a href="#main" className="text-link">Back to top<ArrowIcon className="-rotate-90" /></a></div>
        <a href="/" className="footer-wordmark" aria-label="mlabs Growth home">mlabs<span>growth</span><i>.</i></a>
        <div className="footer-bottom"><p>© {new Date().getFullYear()} {site.name}</p><nav aria-label="Footer"><ul>{navLinks.map(link => <li key={link.href}><a href={link.href}>{link.label}</a></li>)}</ul></nav><span>Products & brand services by Mehul.</span></div>
      </div>
    </footer>
  );
}
