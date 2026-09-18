import { useEffect, useRef, useState } from 'react';
import { ArrowIcon } from '@/components/ui/MagneticButton';
import { useLenis } from '@/components/providers/SmoothScrollProvider';
import { serviceRoutes } from '@/data/services';
import { tools } from '@/data/tools';
import { primaryCta, site } from '@/data/site';

interface NavbarProps { pathname?: string }

function Caret() {
  return <svg className="nav-caret" viewBox="0 0 12 12" aria-hidden="true"><path d="m2.5 4.5 3.5 3 3.5-3" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function Navbar({ pathname = '/' }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [desktopMenu, setDesktopMenu] = useState<'services' | 'tools' | null>(null);
  const [pastHero, setPastHero] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const lenis = useLenis();
  const serviceActive = pathname.startsWith('/services/');
  const toolsActive = pathname.startsWith('/tools');
  const offersActive = pathname === '/offers';
  const interior = pathname !== '/';

  useEffect(() => {
    if (pathname !== '/') return;

    const hero = document.querySelector<HTMLElement>('#top');
    if (!hero) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      setPastHero(hero.getBoundingClientRect().bottom <= 0);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

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
    const media = window.matchMedia('(min-width: 1100px)');
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
    <header className={`site-header${interior ? ' interior-header' : ''}${pastHero ? ' is-compact' : ''}`}>
      <nav className="shell nav-inner" aria-label="Primary">
        <a href="/" className="wordmark" aria-label="mlabs Growth home">mlabs<span>growth</span><i aria-hidden="true" /></a>
        <ul className="desktop-nav">
          <li><a href="/" className={pathname === '/' ? 'active' : undefined} aria-current={pathname === '/' ? 'page' : undefined}>Home</a></li>
          <li className="nav-dropdown" onKeyDown={event => { if (event.key === 'Escape') { setDesktopMenu(null); event.currentTarget.querySelector('button')?.focus(); } }} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setDesktopMenu(null); }}>
            <button type="button" className={serviceActive ? 'nav-parent active' : 'nav-parent'} aria-expanded={desktopMenu === 'services'} onClick={() => setDesktopMenu(menu => menu === 'services' ? null : 'services')}>Services <Caret /></button>
            <div className={`nav-dropdown-panel${desktopMenu === 'services' ? ' is-open' : ''}`}>
              <p>Choose the leak to close first</p>
              {serviceRoutes.map(service => (
                <a href={`/services/${service.slug}`} aria-current={pathname === `/services/${service.slug}` ? 'page' : undefined} key={service.slug}>
                  <span>{service.navLabel}</span><small>{service.navDescription}</small><ArrowIcon />
                </a>
              ))}
            </div>
          </li>
          <li className="nav-dropdown tools-dropdown" onKeyDown={event => { if (event.key === 'Escape') { setDesktopMenu(null); event.currentTarget.querySelector('button')?.focus(); } }} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setDesktopMenu(null); }}>
            <div className="nav-parent-group">
              <a href="/tools" className={toolsActive ? 'nav-parent active' : 'nav-parent'} aria-current={pathname === '/tools' ? 'page' : undefined}>Free tools</a>
              <button type="button" className="nav-dropdown-toggle" aria-label="Open Tools menu" aria-expanded={desktopMenu === 'tools'} onClick={() => setDesktopMenu(menu => menu === 'tools' ? null : 'tools')}><Caret /></button>
            </div>
            <div className={`nav-dropdown-panel nav-tools-panel${desktopMenu === 'tools' ? ' is-open' : ''}`}>
              <div className="nav-dropdown-heading"><p>Free D2C calculators</p><a href="/tools">View all tools <span aria-hidden="true">↗</span></a></div>
              <div className="nav-tool-grid">
                {tools.map(tool => <a href={`/tools/${tool.slug}`} aria-current={pathname === `/tools/${tool.slug}` ? 'page' : undefined} key={tool.slug}><span>{tool.number}</span>{tool.title}</a>)}
              </div>
            </div>
          </li>
          <li><a href="/products" className={pathname.startsWith('/products') ? 'active' : undefined} aria-current={pathname === '/products' ? 'page' : undefined}>Products</a></li>
          <li><a href="/about" aria-current={pathname === '/about' ? 'page' : undefined}>About</a></li>
          <li><a href="/offers" className={offersActive ? 'active' : undefined} aria-current={offersActive ? 'page' : undefined}>Pricing & scope</a></li>
        </ul>
        <a href={site.bookingUrl} className="nav-contact nav-static-link" data-cta-location="navigation">{primaryCta.short} <ArrowIcon className="-rotate-45" /></a>
        <button ref={toggleRef} type="button" className="menu-toggle" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="mobile-menu" aria-label="Open navigation menu"><span /><span /></button>
      </nav>

      <dialog ref={dialogRef} id="mobile-menu" className="mobile-menu" onCancel={closeMenu} onClose={() => setOpen(false)} aria-label="Navigation">
        <div className="mobile-menu-top"><a href="/" className="wordmark" onClick={closeMenu}>mlabs<span>growth</span><i aria-hidden="true" /></a><button type="button" onClick={closeMenu} className="menu-close" aria-label="Close navigation menu">×</button></div>
        <nav aria-label="Mobile" className="mobile-primary">
          <a href="/" onClick={closeMenu} aria-current={pathname === '/' ? 'page' : undefined}><span>01</span>Home<ArrowIcon /></a>
          <details open={serviceActive}>
            <summary><span>02</span>Services<Caret /></summary>
            <div>{serviceRoutes.map(service => <a href={`/services/${service.slug}`} onClick={closeMenu} aria-current={pathname === `/services/${service.slug}` ? 'page' : undefined} key={service.slug}>{service.navLabel}<ArrowIcon /></a>)}</div>
          </details>
          <details open={toolsActive}>
            <summary><span>03</span>Free tools<Caret /></summary>
            <div><a href="/tools" onClick={closeMenu} aria-current={pathname === '/tools' ? 'page' : undefined}>All calculators<ArrowIcon /></a>{tools.map(tool => <a href={`/tools/${tool.slug}`} onClick={closeMenu} aria-current={pathname === `/tools/${tool.slug}` ? 'page' : undefined} key={tool.slug}>{tool.title}<ArrowIcon /></a>)}</div>
          </details>
          <a href="/products" onClick={closeMenu} aria-current={pathname === '/products' ? 'page' : undefined}><span>04</span>Products<ArrowIcon /></a>
          <a href="/about" onClick={closeMenu} aria-current={pathname === '/about' ? 'page' : undefined}><span>05</span>About<ArrowIcon /></a>
          <a href="/offers" onClick={closeMenu} aria-current={offersActive ? 'page' : undefined}><span>06</span>Pricing & scope<ArrowIcon /></a>
          <a href={site.bookingUrl} onClick={closeMenu} data-cta-location="mobile-navigation"><span>07</span>{primaryCta.short}<ArrowIcon /></a>
        </nav>
        <p>Practical AI workflows. Products and services by Mehul.</p>
      </dialog>
    </header>
  );
}
