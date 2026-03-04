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

const FORM_STYLES = `
  .hs-form label {
    color: #343A40 !important;
    font-weight: 600 !important;
    font-size: 0.875rem !important;
    margin-bottom: 0.375rem !important;
    display: block !important;
  }
  .hs-form .hs-input,
  .hs-form select,
  .hs-form textarea {
    color: #343A40 !important;
    background-color: #F8F9FA !important;
    border: 1px solid #E9ECEF !important;
    border-radius: 0.75rem !important;
    padding: 0.625rem 0.875rem !important;
    font-size: 0.9375rem !important;
    width: 100% !important;
    transition: border-color 0.2s, box-shadow 0.2s !important;
    outline: none !important;
    box-sizing: border-box !important;
  }
  .hs-form .hs-input:focus,
  .hs-form select:focus,
  .hs-form textarea:focus {
    border-color: #0066B2 !important;
    box-shadow: 0 0 0 3px rgba(0, 102, 178, 0.12) !important;
    background-color: #fff !important;
  }
  .hs-form textarea {
    min-height: 100px !important;
    resize: vertical !important;
  }
  .hs-form .hs-input::placeholder,
  .hs-form textarea::placeholder {
    color: #ADB5BD !important;
  }
  .hs-form .hs-form-field {
    margin-bottom: 1.25rem !important;
  }
  .hs-form .hs-field-desc {
    color: #868E96 !important;
    font-size: 0.8125rem !important;
    margin-top: 0.25rem !important;
  }
  .hs-form .hs-error-msg,
  .hs-form .hs-error-msgs label {
    color: #C62828 !important;
    font-size: 0.8125rem !important;
    font-weight: 400 !important;
    margin-top: 0.25rem !important;
  }
  .hs-form .hs-richtext p {
    color: #343A40 !important;
    font-size: 0.875rem !important;
  }
  .hs-form select option {
    color: #343A40 !important;
  }
  .hs-form .hs-submit .hs-button,
  .hs-form input[type="submit"] {
    background-color: #FF7B00 !important;
    color: #fff !important;
    border: none !important;
    border-radius: 0.75rem !important;
    padding: 0.625rem 1.5rem !important;
    font-weight: 600 !important;
    font-size: 0.9375rem !important;
    cursor: pointer !important;
    transition: background-color 0.2s, box-shadow 0.2s !important;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05) !important;
  }
  .hs-form .hs-submit .hs-button:hover,
  .hs-form input[type="submit"]:hover {
    background-color: #CC6200 !important;
    box-shadow: 0 4px 12px rgba(255, 123, 0, 0.25) !important;
  }
  .hs-form fieldset {
    max-width: 100% !important;
  }
  .hs-form fieldset.form-columns-2 .hs-form-field {
    width: 48% !important;
  }
  .hs-form .hs-form-checkbox label,
  .hs-form .hs-form-radio label {
    font-weight: 400 !important;
    font-size: 0.9375rem !important;
    color: #495057 !important;
  }
  .hs-form .legal-consent-container,
  .hs-form .legal-consent-container *,
  .legal-consent-container,
  .legal-consent-container *,
  [id^="hsform-"] .legal-consent-container,
  [id^="hsform-"] .legal-consent-container * {
    font-size: 0.75rem !important;
    color: #868E96 !important;
  }
  .hs-form .legal-consent-container a,
  .legal-consent-container a,
  [id^="hsform-"] .legal-consent-container a {
    color: #0066B2 !important;
    text-decoration: underline !important;
  }
  .hs-form .hs-form-required {
    color: #C62828 !important;
  }
`;

export function HubSpotForm({ formId }: { formId: string }) {
  const targetId = `hsform-${formId}`;
  const createdRef = useRef(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (createdRef.current) return;

    const injectStyles = () => {
      const container = document.getElementById(targetId);
      if (!container) return;

      // Inject into the page
      const styleId = `hs-style-${formId}`;
      if (!document.getElementById(styleId)) {
        const style = document.createElement("style");
        style.id = styleId;
        style.textContent = FORM_STYLES;
        document.head.appendChild(style);
      }

      // Also inject into any iframe the form might use
      const iframe = container.querySelector("iframe");
      if (iframe?.contentDocument) {
        const iframeStyle = iframe.contentDocument.createElement("style");
        iframeStyle.textContent = FORM_STYLES;
        iframe.contentDocument.head.appendChild(iframeStyle);
      }
    };

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
          // Inject styles once form is in the DOM
          injectStyles();
          // Re-inject after a short delay in case HubSpot loads async content
          setTimeout(injectStyles, 500);
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
