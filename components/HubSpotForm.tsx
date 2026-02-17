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
const SCRIPT_SRC = "//js.hsforms.net/forms/embed/v2.js";

export function HubSpotForm({ formId }: { formId: string }) {
  const targetId = `hsform-${formId}`;
  const createdRef = useRef(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (createdRef.current) return;

    const createForm = () => {
      if (!window.hbspt || createdRef.current) return;
      if (!document.getElementById(targetId)) return;
      createdRef.current = true;
      window.hbspt.forms.create({
        region: REGION,
        portalId: PORTAL_ID,
        formId,
        target: `#${targetId}`,
        onFormReady() {
          setLoading(false);
        },
      });
    };

    // If script is already loaded, just create the form
    if (window.hbspt) {
      createForm();
      return;
    }

    // Only append script if not already in the document
    const existing = document.querySelector(`script[src="${SCRIPT_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", createForm);
      return;
    }

    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => createForm();
    document.body.appendChild(script);
  }, [formId, targetId]);

  return (
    <div>
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--gray-300)] border-t-[var(--blue-500)]" />
        </div>
      )}
      <div id={targetId} />
    </div>
  );
}
