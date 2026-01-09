"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { createLowlight, common } from "lowlight";
import { useState, useCallback, useEffect } from "react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  ImageIcon,
  Link as LinkIcon,
  Unlink,
  Code2,
  Undo,
  Redo,
  FileCode,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ImageUpload } from "./ImageUpload";

const lowlight = createLowlight(common);

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Start writing...",
  className,
}: RichTextEditorProps) {
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [showHtmlView, setShowHtmlView] = useState(false);
  const [htmlContent, setHtmlContent] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3, 4],
        },
        codeBlock: false, // We'll use CodeBlockLowlight instead
      }),
      Underline,
      Image.configure({
        HTMLAttributes: {
          class: "rounded-lg max-w-full h-auto",
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-[var(--blue-500)] hover:underline",
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: "rounded-lg bg-[var(--gray-900)] p-4 text-sm overflow-x-auto",
        },
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg max-w-none focus:outline-none min-h-[300px] px-4 py-3",
      },
    },
  });

  // Update editor content when value changes from outside
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  const setLink = useCallback(() => {
    if (!editor) return;

    if (linkUrl === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: linkUrl })
        .run();
    }

    setShowLinkModal(false);
    setLinkUrl("");
  }, [editor, linkUrl]);

  const addImage = useCallback(() => {
    if (!editor || !imageUrl) return;

    editor.chain().focus().setImage({ src: imageUrl }).run();
    setShowImageModal(false);
    setImageUrl("");
  }, [editor, imageUrl]);

  const toggleHtmlView = useCallback(() => {
    if (!editor) return;

    if (showHtmlView) {
      // Switch back to WYSIWYG mode
      editor.commands.setContent(htmlContent);
      onChange(htmlContent);
    } else {
      // Switch to HTML mode
      setHtmlContent(editor.getHTML());
    }
    setShowHtmlView(!showHtmlView);
  }, [editor, showHtmlView, htmlContent, onChange]);

  if (!editor) {
    return (
      <div className="border border-[var(--gray-200)] rounded-lg bg-white">
        <div className="h-[400px] flex items-center justify-center">
          <div className="text-[var(--gray-400)]">Loading editor...</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "border border-[var(--gray-200)] rounded-lg bg-white overflow-hidden",
        className
      )}
    >
      {/* Toolbar */}
      <div className="border-b border-[var(--gray-200)] px-2 py-2 flex flex-wrap items-center gap-1 bg-[var(--gray-50)]">
        {/* History */}
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="Undo"
        >
          <Undo className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="Redo"
        >
          <Redo className="w-4 h-4" />
        </ToolbarButton>

        <ToolbarDivider />

        {/* Text Formatting */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive("underline")}
          title="Underline"
        >
          <UnderlineIcon className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive("strike")}
          title="Strikethrough"
        >
          <Strikethrough className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          active={editor.isActive("code")}
          title="Inline Code"
        >
          <Code className="w-4 h-4" />
        </ToolbarButton>

        <ToolbarDivider />

        {/* Headings */}
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          active={editor.isActive("heading", { level: 2 })}
          title="Heading 2"
        >
          <Heading2 className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          active={editor.isActive("heading", { level: 3 })}
          title="Heading 3"
        >
          <Heading3 className="w-4 h-4" />
        </ToolbarButton>

        <ToolbarDivider />

        {/* Lists */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
          title="Numbered List"
        >
          <ListOrdered className="w-4 h-4" />
        </ToolbarButton>

        <ToolbarDivider />

        {/* Blocks */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive("blockquote")}
          title="Quote"
        >
          <Quote className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          active={editor.isActive("codeBlock")}
          title="Code Block"
        >
          <Code2 className="w-4 h-4" />
        </ToolbarButton>

        <ToolbarDivider />

        {/* Link */}
        {editor.isActive("link") ? (
          <ToolbarButton
            onClick={() => editor.chain().focus().unsetLink().run()}
            active={true}
            title="Remove Link"
          >
            <Unlink className="w-4 h-4" />
          </ToolbarButton>
        ) : (
          <ToolbarButton
            onClick={() => {
              const existingUrl = editor.getAttributes("link").href || "";
              setLinkUrl(existingUrl);
              setShowLinkModal(true);
            }}
            title="Add Link"
          >
            <LinkIcon className="w-4 h-4" />
          </ToolbarButton>
        )}

        {/* Image */}
        <ToolbarButton
          onClick={() => setShowImageModal(true)}
          title="Insert Image"
        >
          <ImageIcon className="w-4 h-4" />
        </ToolbarButton>

        <ToolbarDivider />

        {/* HTML View Toggle */}
        <ToolbarButton
          onClick={toggleHtmlView}
          active={showHtmlView}
          title={showHtmlView ? "Visual Editor" : "HTML Source"}
        >
          <FileCode className="w-4 h-4" />
        </ToolbarButton>
      </div>

      {/* Editor Content */}
      {showHtmlView ? (
        <textarea
          value={htmlContent}
          onChange={(e) => setHtmlContent(e.target.value)}
          className="w-full min-h-[300px] p-4 font-mono text-sm focus:outline-none resize-y"
          placeholder="<p>Enter HTML content...</p>"
        />
      ) : (
        <EditorContent editor={editor} />
      )}

      {/* Link Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <h3 className="font-[family-name:var(--font-outfit)] font-semibold text-lg text-[var(--navy-800)] mb-4">
              Insert Link
            </h3>
            <input
              type="url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-4 py-2 border border-[var(--gray-200)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--blue-500)] mb-4"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  setLink();
                }
              }}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowLinkModal(false);
                  setLinkUrl("");
                }}
                className="px-4 py-2 text-sm font-medium text-[var(--gray-600)] hover:bg-[var(--gray-100)] rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={setLink}
                className="px-4 py-2 text-sm font-medium text-white bg-[var(--blue-500)] hover:bg-[var(--blue-600)] rounded-lg transition-colors"
              >
                Insert
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl">
            <h3 className="font-[family-name:var(--font-outfit)] font-semibold text-lg text-[var(--navy-800)] mb-4">
              Insert Image
            </h3>
            <ImageUpload
              value={imageUrl}
              onChange={setImageUrl}
              folder="blog"
              label=""
              hint="Upload an image or paste a URL"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => {
                  setShowImageModal(false);
                  setImageUrl("");
                }}
                className="px-4 py-2 text-sm font-medium text-[var(--gray-600)] hover:bg-[var(--gray-100)] rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={addImage}
                disabled={!imageUrl}
                className="px-4 py-2 text-sm font-medium text-white bg-[var(--blue-500)] hover:bg-[var(--blue-600)] rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Insert
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Toolbar button component
function ToolbarButton({
  onClick,
  active,
  disabled,
  title,
  children,
  size = "md",
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={cn(
        "rounded transition-colors",
        size === "sm" ? "p-1" : "p-1.5",
        active
          ? "bg-[var(--blue-100)] text-[var(--blue-600)]"
          : "text-[var(--gray-600)] hover:bg-[var(--gray-200)] hover:text-[var(--gray-900)]",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      {children}
    </button>
  );
}

// Toolbar divider
function ToolbarDivider() {
  return <div className="w-px h-6 bg-[var(--gray-200)] mx-1" />;
}
