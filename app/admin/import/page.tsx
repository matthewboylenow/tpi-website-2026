"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Upload,
  FileText,
  Check,
  X,
  AlertCircle,
  ArrowRight,
  SkipForward,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ImportResult {
  success: boolean;
  summary: {
    total: number;
    imported: number;
    skipped: number;
    errors: number;
  };
  imported: { title: string; slug: string; id: number }[];
  skipped: { title: string; reason: string }[];
  errors: { title: string; error: string }[];
  categories: string[];
  tags: string[];
  parseErrors: string[];
}

export default function ImportPage() {
  const [file, setFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState<ImportResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [importAsDraft, setImportAsDraft] = useState(true);
  const [skipDuplicates, setSkipDuplicates] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResult(null);
      setError(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.name.endsWith(".xml")) {
      setFile(droppedFile);
      setResult(null);
      setError(null);
    }
  };

  const handleImport = async () => {
    if (!file) return;

    setImporting(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("importAsDraft", importAsDraft.toString());
      formData.append("skipDuplicates", skipDuplicates.toString());

      const response = await fetch("/api/admin/import/wordpress", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        setError(data.error || "Import failed");
      }
    } catch (err) {
      console.error("Import error:", err);
      setError("Failed to import file");
    } finally {
      setImporting(false);
    }
  };

  const resetImport = () => {
    setFile(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 bg-[var(--blue-50)] rounded-xl">
          <Upload className="w-6 h-6 text-[var(--blue-500)]" />
        </div>
        <div>
          <h1 className="font-[family-name:var(--font-heading)] font-bold text-2xl text-[var(--navy-800)]">
            WordPress Import
          </h1>
          <p className="text-[var(--gray-600)] mt-1">
            Import blog posts from a WordPress XML export
          </p>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-[var(--blue-50)] rounded-xl p-4 border border-[var(--blue-200)]">
        <h3 className="font-[family-name:var(--font-heading)] font-semibold text-[var(--blue-800)] mb-2">
          How to export from WordPress
        </h3>
        <ol className="list-decimal list-inside text-sm text-[var(--blue-700)] space-y-1">
          <li>Log in to your WordPress admin dashboard</li>
          <li>Go to Tools &rarr; Export</li>
          <li>Select &quot;Posts&quot; or &quot;All content&quot;</li>
          <li>Click &quot;Download Export File&quot;</li>
          <li>Upload the downloaded XML file here</li>
        </ol>
      </div>

      {!result ? (
        <div className="bg-white rounded-xl shadow-sm border border-[var(--gray-200)] overflow-hidden">
          {/* Upload Area */}
          <div className="p-6">
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors",
                file
                  ? "border-green-300 bg-green-50"
                  : "border-[var(--gray-300)] hover:border-[var(--blue-400)] hover:bg-[var(--blue-50)]"
              )}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".xml"
                onChange={handleFileChange}
                className="hidden"
              />

              {file ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-[var(--navy-800)]">{file.name}</p>
                    <p className="text-sm text-[var(--gray-500)]">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      resetImport();
                    }}
                    className="ml-4 p-2 hover:bg-red-100 rounded-lg text-red-500"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="w-12 h-12 text-[var(--gray-400)] mx-auto mb-4" />
                  <p className="text-[var(--gray-600)] mb-2">
                    Drag and drop your WordPress export file, or click to browse
                  </p>
                  <p className="text-sm text-[var(--gray-400)]">
                    Accepts .xml files from WordPress export
                  </p>
                </>
              )}
            </div>

            {/* Import Options */}
            {file && (
              <div className="mt-6 p-4 bg-[var(--gray-50)] rounded-lg">
                <h3 className="font-medium text-[var(--navy-800)] mb-3">
                  Import Options
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={importAsDraft}
                      onChange={(e) => setImportAsDraft(e.target.checked)}
                      className="w-4 h-4 rounded border-[var(--gray-300)] text-[var(--blue-500)]"
                    />
                    <span className="text-sm">
                      Import all posts as drafts (recommended for review)
                    </span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={skipDuplicates}
                      onChange={(e) => setSkipDuplicates(e.target.checked)}
                      className="w-4 h-4 rounded border-[var(--gray-300)] text-[var(--blue-500)]"
                    />
                    <span className="text-sm">
                      Skip posts with duplicate slugs
                    </span>
                  </label>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Import Button */}
            {file && (
              <div className="mt-6 flex justify-end">
                <Button
                  variant="primary"
                  onClick={handleImport}
                  isLoading={importing}
                  disabled={importing}
                >
                  {importing ? "Importing..." : "Start Import"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Results */
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-[var(--gray-200)]">
              <p className="text-sm text-[var(--gray-500)]">Total Found</p>
              <p className="text-2xl font-bold text-[var(--navy-800)]">
                {result.summary.total}
              </p>
            </div>
            <div className="bg-green-50 rounded-xl p-4 shadow-sm border border-green-200">
              <p className="text-sm text-green-600">Imported</p>
              <p className="text-2xl font-bold text-green-700">
                {result.summary.imported}
              </p>
            </div>
            <div className="bg-yellow-50 rounded-xl p-4 shadow-sm border border-yellow-200">
              <p className="text-sm text-yellow-600">Skipped</p>
              <p className="text-2xl font-bold text-yellow-700">
                {result.summary.skipped}
              </p>
            </div>
            <div className="bg-red-50 rounded-xl p-4 shadow-sm border border-red-200">
              <p className="text-sm text-red-600">Errors</p>
              <p className="text-2xl font-bold text-red-700">
                {result.summary.errors}
              </p>
            </div>
          </div>

          {/* Imported Posts */}
          {result.imported.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-[var(--gray-200)] overflow-hidden">
              <div className="px-6 py-4 border-b border-[var(--gray-200)] bg-green-50">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold text-green-800">
                    Imported Posts ({result.imported.length})
                  </h3>
                </div>
              </div>
              <div className="divide-y divide-[var(--gray-100)] max-h-[300px] overflow-y-auto">
                {result.imported.map((post) => (
                  <div
                    key={post.id}
                    className="px-6 py-3 flex items-center justify-between"
                  >
                    <span className="text-[var(--navy-800)]">{post.title}</span>
                    <Link
                      href={`/admin/blog/${post.id}`}
                      className="text-sm text-[var(--blue-500)] hover:underline"
                    >
                      Edit
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skipped Posts */}
          {result.skipped.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-[var(--gray-200)] overflow-hidden">
              <div className="px-6 py-4 border-b border-[var(--gray-200)] bg-yellow-50">
                <div className="flex items-center gap-2">
                  <SkipForward className="w-5 h-5 text-yellow-600" />
                  <h3 className="font-semibold text-yellow-800">
                    Skipped Posts ({result.skipped.length})
                  </h3>
                </div>
              </div>
              <div className="divide-y divide-[var(--gray-100)] max-h-[200px] overflow-y-auto">
                {result.skipped.map((post, i) => (
                  <div
                    key={i}
                    className="px-6 py-3 flex items-center justify-between"
                  >
                    <span className="text-[var(--gray-700)]">{post.title}</span>
                    <span className="text-sm text-[var(--gray-500)]">
                      {post.reason}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Errors */}
          {result.errors.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-[var(--gray-200)] overflow-hidden">
              <div className="px-6 py-4 border-b border-[var(--gray-200)] bg-red-50">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <h3 className="font-semibold text-red-800">
                    Failed Posts ({result.errors.length})
                  </h3>
                </div>
              </div>
              <div className="divide-y divide-[var(--gray-100)] max-h-[200px] overflow-y-auto">
                {result.errors.map((err, i) => (
                  <div key={i} className="px-6 py-3">
                    <p className="text-[var(--gray-700)]">{err.title}</p>
                    <p className="text-sm text-red-500">{err.error}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Button variant="secondary" onClick={resetImport}>
              Import Another File
            </Button>
            <Link href="/admin/blog">
              <Button variant="primary">
                Go to Blog Posts
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
