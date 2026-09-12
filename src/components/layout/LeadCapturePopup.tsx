import { useEffect, useRef } from 'react';
import { ArrowIcon } from '@/components/ui/MagneticButton';
import { useLenis } from '@/components/providers/SmoothScrollProvider';

const popupSessionKey = 'mehul-labs:lead-popup-shown';

export function LeadCapturePopup({ pathname = '/' }: { pathname?: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const retryRef = useRef<number | null>(null);
  const lenis = useLenis();
  const auditHref = pathname === '/' ? '#contact' : '/#contact';

  useEffect(() => {
    let cancelled = false;

    function showWhenReady() {
      if (cancelled || sessionStorage.getItem(popupSessionKey)) return;
      const dialog = dialogRef.current;
      if (!dialog) return;
      const anotherDialogIsOpen = Array.from(document.querySelectorAll<HTMLDialogElement>('dialog[open]'))
        .some(item => item !== dialog);
      if (anotherDialogIsOpen) {
        retryRef.current = window.setTimeout(showWhenReady, 2500);
        return;
      }
      dialog.showModal();
      sessionStorage.setItem(popupSessionKey, '1');
      lenis?.stop();
    }

    const timer = window.setTimeout(showWhenReady, 5000);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      if (retryRef.current) window.clearTimeout(retryRef.current);
      lenis?.start();
    };
  }, [lenis]);

  function closePopup() {
    dialogRef.current?.close();
    lenis?.start();
  }

  return (
    <dialog
      ref={dialogRef}
      className="lead-popup"
      aria-labelledby="lead-popup-title"
      aria-describedby="lead-popup-description"
      onCancel={closePopup}
      onClose={() => lenis?.start()}
      onClick={event => { if (event.target === event.currentTarget) closePopup(); }}
    >
      <button type="button" className="lead-popup-close" onClick={closePopup} aria-label="Close offer">×</button>
      <p className="lead-popup-kicker"><span aria-hidden="true" /> Before you go deeper</p>
      <h2 id="lead-popup-title">Find the leak.<br /><span>Or take the playbook.</span></h2>
      <p id="lead-popup-description">Choose the fastest useful next step for your D2C brand.</p>
      <div className="lead-popup-actions">
        <a href={auditHref} onClick={closePopup} data-cta-location="timed-popup-audit">
          <span><strong>Get my free leak audit</strong><small>20 minutes · no obligation</small></span><ArrowIcon />
        </a>
        <a href="/d2c-brand-pillars.pdf" download onClick={closePopup} data-cta-location="timed-popup-pdf">
          <span><strong>Get the D2C Brand Pillars PDF</strong><small>Download the practical guide</small></span><ArrowIcon />
        </a>
      </div>
      <p className="lead-popup-note">No email gate. Pick what is useful.</p>
    </dialog>
  );
}
