"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (opts: Record<string, unknown>) => void;
      };
    };
  }
}

const PORTAL_ID = "2780498";
const REGION = "na1";

export function HubSpotForm({ formId }: { formId: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const createForm = () => {
      if (window.hbspt && containerRef.current) {
        containerRef.current.innerHTML = "";
        window.hbspt.forms.create({
          region: REGION,
          portalId: PORTAL_ID,
          formId,
          target: containerRef.current,
          onFormReady: () => setLoading(false),
        });
      }
    };

    // If script is already loaded, just create the form
    if (window.hbspt) {
      createForm();
      return;
    }

    // Load the HubSpot forms script
    const script = document.createElement("script");
    script.src = "//js.hsforms.net/forms/embed/v2.js";
    script.async = true;
    script.onload = () => createForm();
    document.head.appendChild(script);
  }, [formId]);

  return (
    <div>
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--gray-300)] border-t-[var(--blue-500)]" />
        </div>
      )}
      <div ref={containerRef} />
    </div>
  );
}
