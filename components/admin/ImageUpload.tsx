"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { Upload, X, Loader2, ImageIcon, FileText } from "lucide-react";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  folder?: string;
  accept?: string;
  label?: string;
  hint?: string;
  className?: string;
}

export function ImageUpload({
  value,
  onChange,
  folder = "uploads",
  accept = "image/*",
  label,
  hint,
  className = "",
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isImage = value?.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i);
  const isPdf = value?.match(/\.pdf$/i);

  const handleUpload = useCallback(
    async (file: File) => {
      setIsUploading(true);
      setError(null);

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", folder);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Upload failed");
        }

        onChange(data.url);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed");
      } finally {
        setIsUploading(false);
      }
    },
    [folder, onChange]
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  const handleClear = () => {
    onChange("");
    setError(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">
          {label}
        </label>
      )}

      {/* Current Value Preview */}
      {value && (
        <div className="relative mb-3">
          <div className="relative bg-[var(--gray-50)] rounded-lg border border-[var(--gray-200)] overflow-hidden">
            {isImage ? (
              <div className="relative aspect-video max-h-48">
                <Image
                  src={value}
                  alt="Uploaded image"
                  fill
                  className="object-contain p-2"
                />
              </div>
            ) : isPdf ? (
              <div className="flex items-center gap-3 p-4">
                <FileText className="w-8 h-8 text-red-500" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--gray-900)] truncate">
                    PDF Document
                  </p>
                  <p className="text-xs text-[var(--gray-500)] truncate">{value}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 p-4">
                <ImageIcon className="w-8 h-8 text-[var(--gray-400)]" />
                <p className="text-sm text-[var(--gray-600)] truncate flex-1">
                  {value}
                </p>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={handleClear}
            className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md hover:bg-[var(--gray-100)] transition-colors"
            title="Remove"
          >
            <X className="w-4 h-4 text-[var(--gray-600)]" />
          </button>
        </div>
      )}

      {/* Upload Zone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${isDragging ? "border-[var(--blue-500)] bg-[var(--blue-50)]" : "border-[var(--gray-300)] hover:border-[var(--blue-400)] hover:bg-[var(--gray-50)]"}
          ${isUploading ? "pointer-events-none opacity-60" : ""}
        `}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleFileSelect}
          className="hidden"
          disabled={isUploading}
        />

        {isUploading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-8 h-8 text-[var(--blue-500)] animate-spin" />
            <p className="text-sm text-[var(--gray-600)]">Uploading...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Upload className="w-8 h-8 text-[var(--gray-400)]" />
            <div>
              <p className="text-sm text-[var(--gray-700)]">
                <span className="text-[var(--blue-500)] font-medium">
                  Click to upload
                </span>{" "}
                or drag and drop
              </p>
              <p className="text-xs text-[var(--gray-500)] mt-1">
                {accept === "image/*"
                  ? "PNG, JPG, GIF, WebP, SVG up to 4.5MB"
                  : "Images or PDF up to 4.5MB"}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}

      {/* Hint */}
      {hint && !error && (
        <p className="mt-2 text-xs text-[var(--gray-500)]">{hint}</p>
      )}

      {/* URL Input Fallback */}
      <div className="mt-3">
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Or paste URL directly..."
          className="w-full px-3 py-2 text-sm border border-[var(--gray-300)] rounded-lg focus:ring-2 focus:ring-[var(--blue-500)] focus:border-transparent"
        />
      </div>
    </div>
  );
}
