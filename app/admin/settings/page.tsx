"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Save, Settings, Loader2, Check } from "lucide-react";

interface SiteSettings {
  site_logo_url: string;
  site_favicon_url: string;
  site_og_image_url: string;
  homepage_meta_title: string;
  homepage_meta_description: string;
}

const DEFAULT_SETTINGS: SiteSettings = {
  site_logo_url: "",
  site_favicon_url: "",
  site_og_image_url: "",
  homepage_meta_title: "Taylor Products | Premium Foodservice Equipment",
  homepage_meta_description:
    "Taylor Products is a family-owned distributor of Taylor soft serve machines, frozen beverage equipment, and commercial grills serving NJ, PA, NY, and DE.",
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      try {
        const response = await fetch("/api/admin/settings");
        if (response.ok) {
          const data = await response.json();
          setSettings({ ...DEFAULT_SETTINGS, ...data.settings });
        }
      } catch (error) {
        console.error("Failed to load settings:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaved(false);

    try {
      const response = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        alert("Failed to save settings");
      }
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--blue-500)]" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[var(--blue-50)] rounded-xl">
            <Settings className="w-6 h-6 text-[var(--blue-500)]" />
          </div>
          <div>
            <h1 className="font-[family-name:var(--font-heading)] font-bold text-2xl text-[var(--navy-800)]">
              Site Settings
            </h1>
            <p className="text-[var(--gray-600)] mt-1">
              Manage branding and site-wide settings
            </p>
          </div>
        </div>
        <Button type="submit" variant="primary" isLoading={isSaving}>
          {saved ? (
            <>
              <Check className="w-4 h-4" />
              Saved!
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              {isSaving ? "Saving..." : "Save Settings"}
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Branding */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[var(--gray-200)]">
          <h2 className="font-[family-name:var(--font-heading)] font-semibold text-lg text-[var(--navy-800)] mb-4">
            Logo & Branding
          </h2>
          <div className="space-y-6">
            <ImageUpload
              label="Site Logo"
              value={settings.site_logo_url}
              onChange={(url) =>
                setSettings((prev) => ({ ...prev, site_logo_url: url }))
              }
              folder="branding"
              hint="Recommended: PNG with transparency, 300x100 or similar aspect ratio"
            />
            <ImageUpload
              label="Favicon"
              value={settings.site_favicon_url}
              onChange={(url) =>
                setSettings((prev) => ({ ...prev, site_favicon_url: url }))
              }
              folder="branding"
              hint="Recommended: Square PNG or ICO, 32x32 or 64x64"
            />
          </div>
        </div>

        {/* Social Share */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[var(--gray-200)]">
          <h2 className="font-[family-name:var(--font-heading)] font-semibold text-lg text-[var(--navy-800)] mb-4">
            Social Share Image
          </h2>
          <ImageUpload
            label="Default OG Image"
            value={settings.site_og_image_url}
            onChange={(url) =>
              setSettings((prev) => ({ ...prev, site_og_image_url: url }))
            }
            folder="branding"
            hint="Used when sharing on social media. Recommended: 1200x630 pixels"
          />
        </div>

        {/* Homepage SEO */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[var(--gray-200)] lg:col-span-2">
          <h2 className="font-[family-name:var(--font-heading)] font-semibold text-lg text-[var(--navy-800)] mb-4">
            Homepage SEO
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Input
                label="Meta Title"
                value={settings.homepage_meta_title}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    homepage_meta_title: e.target.value,
                  }))
                }
                placeholder="Taylor Products | Premium Foodservice Equipment"
                hint="Appears in browser tab and search results. Recommended: 50-60 characters"
              />
            </div>
            <div className="md:col-span-2">
              <Textarea
                label="Meta Description"
                value={settings.homepage_meta_description}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    homepage_meta_description: e.target.value,
                  }))
                }
                placeholder="Brief description of Taylor Products..."
                hint="Appears in search results. Recommended: 150-160 characters"
              />
            </div>
          </div>

          {/* Preview */}
          <div className="mt-6 p-4 bg-[var(--gray-50)] rounded-lg">
            <p className="text-xs font-medium text-[var(--gray-500)] uppercase tracking-wider mb-2">
              Search Result Preview
            </p>
            <div className="space-y-1">
              <p className="text-[#1a0dab] text-lg hover:underline cursor-pointer">
                {settings.homepage_meta_title || "Page Title"}
              </p>
              <p className="text-[#006621] text-sm">https://taylorproducts.net</p>
              <p className="text-sm text-[var(--gray-600)]">
                {settings.homepage_meta_description || "Page description will appear here..."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
