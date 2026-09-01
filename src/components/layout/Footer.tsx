import { ArrowIcon } from '@/components/ui/MagneticButton';
import { navLinks, site } from '@/data/site';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-top"><p>AI tools for founders who build.</p><a href="#top" className="text-link">Back to top<ArrowIcon className="-rotate-90" /></a></div>
        <a href="#top" className="footer-wordmark" aria-label="Mehul Labs home">mehul<span>labs</span><i>.</i></a>
        <div className="footer-bottom"><p>© {new Date().getFullYear()} {site.name}</p><nav aria-label="Footer"><ul>{navLinks.map(link => <li key={link.href}><a href={link.href}>{link.label}</a></li>)}</ul></nav><span>Independent by design.</span></div>
      </div>
    </footer>
  );
}
