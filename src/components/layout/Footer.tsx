import { ArrowIcon } from '@/components/ui/MagneticButton';
import { navLinks, site } from '@/data/site';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-top"><p>One connected layer. Store, operations and demand.</p><a href="#main" className="text-link">Back to top<ArrowIcon className="-rotate-90" /></a></div>
        <a href="/" className="footer-wordmark" aria-label="Mehul Labs home">mehul<span>labs</span><i>.</i></a>
        <div className="footer-bottom"><p>© {new Date().getFullYear()} {site.name}</p><nav aria-label="Footer"><ul>{navLinks.map(link => <li key={link.href}><a href={link.href}>{link.label}</a></li>)}</ul></nav><span>Built in your accounts. Owned by you.</span></div>
      </div>
    </footer>
  );
}
