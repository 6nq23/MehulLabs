import { useEffect, useRef, useState } from 'react';
import { ArrowIcon } from '@/components/ui/MagneticButton';
import { useLenis } from '@/components/providers/SmoothScrollProvider';
import { navLinks, primaryCta } from '@/data/site';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      dialog.showModal();
      lenis?.stop();
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        dialog.close();
        document.body.style.overflow = previousOverflow;
        lenis?.start();
      };
    }
  }, [open, lenis]);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 900px)');
    const closeOnDesktop = () => { if (media.matches) setOpen(false); };
    media.addEventListener('change', closeOnDesktop);
    return () => media.removeEventListener('change', closeOnDesktop);
  }, []);

  function closeMenu() {
    lenis?.start();
    setOpen(false);
    toggleRef.current?.focus();
  }

  return (
    <header className="site-header">
      <nav className="shell nav-inner" aria-label="Primary">
        <a href="#top" className="wordmark" aria-label="Mehul Labs home">mehul<span>labs</span><i aria-hidden="true" /></a>
        <ul className="desktop-nav">
          {navLinks.map(link => <li key={link.href}><a href={link.href}>{link.label}</a></li>)}
        </ul>
        <a href="#contact" className="nav-contact" data-cta-location="navigation">{primaryCta.short} <ArrowIcon className="-rotate-45" /></a>
        <button ref={toggleRef} type="button" className="menu-toggle" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="mobile-menu" aria-label="Open navigation menu">
          <span /><span />
        </button>
      </nav>
      <dialog ref={dialogRef} id="mobile-menu" className="mobile-menu" onCancel={closeMenu} onClose={() => setOpen(false)} aria-label="Navigation">
        <div className="mobile-menu-top"><span className="wordmark">mehul<span>labs</span><i aria-hidden="true" /></span><button type="button" onClick={closeMenu} className="menu-close" aria-label="Close navigation menu">×</button></div>
        <nav aria-label="Mobile"><ul>{navLinks.map((link, i) => <li key={link.href}><a href={link.href} onClick={closeMenu}><span>0{i + 1}</span>{link.label}<ArrowIcon /></a></li>)}<li><a href="#contact" onClick={closeMenu} data-cta-location="mobile-navigation"><span>05</span>{primaryCta.short}<ArrowIcon /></a></li></ul></nav>
        <p>One connected layer. Store, operations and demand.</p>
      </dialog>
    </header>
  );
}
