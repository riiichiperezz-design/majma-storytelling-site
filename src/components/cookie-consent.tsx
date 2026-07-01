import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { loadAnalytics } from "@/lib/analytics";
import { useT } from "@/lib/i18n";

const CONSENT_KEY = "majma_cookie_consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const t = useT().cookieConsent;

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === "accepted") {
      loadAnalytics();
    } else if (stored !== "rejected") {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    loadAnalytics();
    setVisible(false);
  };

  const reject = () => {
    localStorage.setItem(CONSENT_KEY, "rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[80] border-t border-cream/10 bg-ink/97 px-6 py-5 text-cream backdrop-blur md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-center text-xs leading-relaxed text-cream/80 md:text-left">
          {t.text}{" "}
          <Link to="/privacidad" className="underline underline-offset-2 hover:text-gold">
            {t.link}
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={reject}
            className="border border-cream/30 px-4 py-2 text-xs uppercase tracking-[0.2em] text-cream transition-colors hover:border-gold hover:text-gold"
          >
            {t.reject}
          </button>
          <button
            type="button"
            onClick={accept}
            className="bg-gold px-4 py-2 text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:bg-gold-soft"
          >
            {t.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
