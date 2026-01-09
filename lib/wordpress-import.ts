import { DOMParser } from "@xmldom/xmldom";

export interface WPPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  status: string;
  publishedAt: Date | null;
  featuredImageUrl: string | null;
  categories: string[];
  tags: string[];
}

export interface WPImportResult {
  posts: WPPost[];
  categories: string[];
  tags: string[];
  errors: string[];
}

/**
 * Parse WordPress eXtended RSS (WXR) XML export
 */
export function parseWordPressExport(xmlContent: string): WPImportResult {
  const result: WPImportResult = {
    posts: [],
    categories: [],
    tags: [],
    errors: [],
  };

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlContent, "text/xml");

    // Get all items (posts)
    const items = doc.getElementsByTagName("item");

    // Track unique categories and tags
    const categorySet = new Set<string>();
    const tagSet = new Set<string>();

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      try {
        // Get post type
        const postType = getElementText(item, "wp:post_type");

        // Only import posts (skip pages, attachments, etc.)
        if (postType !== "post") {
          continue;
        }

        const post: WPPost = {
          id: parseInt(getElementText(item, "wp:post_id") || "0", 10),
          title: decodeHTMLEntities(getElementText(item, "title") || ""),
          slug: getElementText(item, "wp:post_name") || "",
          content: cleanWordPressContent(getElementText(item, "content:encoded") || ""),
          excerpt: decodeHTMLEntities(getElementText(item, "excerpt:encoded") || ""),
          author: getElementText(item, "dc:creator") || "",
          status: getElementText(item, "wp:status") || "draft",
          publishedAt: parseWPDate(getElementText(item, "wp:post_date_gmt")),
          featuredImageUrl: null,
          categories: [],
          tags: [],
        };

        // Get categories and tags
        const categoryElements = item.getElementsByTagName("category");
        for (let j = 0; j < categoryElements.length; j++) {
          const cat = categoryElements[j];
          const domain = cat.getAttribute("domain");
          const name = decodeHTMLEntities(cat.textContent || "");

          if (domain === "category" && name) {
            post.categories.push(name);
            categorySet.add(name);
          } else if (domain === "post_tag" && name) {
            post.tags.push(name);
            tagSet.add(name);
          }
        }

        // Look for featured image in postmeta
        const postMeta = item.getElementsByTagName("wp:postmeta");
        for (let j = 0; j < postMeta.length; j++) {
          const metaKey = getElementText(postMeta[j], "wp:meta_key");
          const metaValue = getElementText(postMeta[j], "wp:meta_value");

          if (metaKey === "_thumbnail_id" && metaValue) {
            // Store the thumbnail ID for later resolution
            post.featuredImageUrl = `attachment:${metaValue}`;
          }
        }

        result.posts.push(post);
      } catch (error) {
        result.errors.push(`Error parsing post ${i}: ${error}`);
      }
    }

    result.categories = Array.from(categorySet).sort();
    result.tags = Array.from(tagSet).sort();

    // Try to resolve attachment URLs
    const attachments = new Map<string, string>();
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const postType = getElementText(item, "wp:post_type");
      if (postType === "attachment") {
        const id = getElementText(item, "wp:post_id") || "";
        const url = getElementText(item, "wp:attachment_url") || "";
        if (id && url) {
          attachments.set(id, url);
        }
      }
    }

    // Resolve featured image URLs
    for (const post of result.posts) {
      if (post.featuredImageUrl?.startsWith("attachment:")) {
        const attachmentId = post.featuredImageUrl.replace("attachment:", "");
        post.featuredImageUrl = attachments.get(attachmentId) || null;
      }
    }

  } catch (error) {
    result.errors.push(`Failed to parse XML: ${error}`);
  }

  return result;
}

/**
 * Get text content of an element by tag name
 */
function getElementText(parent: Element, tagName: string): string {
  // Handle namespaced tags
  const parts = tagName.split(":");
  let elements;

  if (parts.length === 2) {
    // Try with namespace
    elements = parent.getElementsByTagNameNS("*", parts[1]);
  } else {
    elements = parent.getElementsByTagName(tagName);
  }

  if (elements.length > 0 && elements[0].textContent) {
    return elements[0].textContent;
  }
  return "";
}

/**
 * Parse WordPress date format
 */
function parseWPDate(dateStr: string | null): Date | null {
  if (!dateStr || dateStr === "0000-00-00 00:00:00") {
    return null;
  }
  try {
    // WordPress format: "2024-01-15 12:30:45"
    const date = new Date(dateStr.replace(" ", "T") + "Z");
    return isNaN(date.getTime()) ? null : date;
  } catch {
    return null;
  }
}

/**
 * Decode HTML entities
 */
function decodeHTMLEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

/**
 * Clean WordPress/Gutenberg content
 */
function cleanWordPressContent(content: string): string {
  // Remove WordPress Gutenberg block comments
  content = content.replace(/<!-- wp:[^>]+-->/g, "");
  content = content.replace(/<!-- \/wp:[^>]+-->/g, "");

  // Remove empty paragraphs
  content = content.replace(/<p>\s*<\/p>/g, "");

  // Convert WordPress gallery shortcodes (basic handling)
  content = content.replace(/\[gallery[^\]]*\]/g, "");

  // Convert WordPress caption shortcodes
  content = content.replace(
    /\[caption[^\]]*\]([\s\S]*?)\[\/caption\]/g,
    '<figure>$1</figure>'
  );

  // Clean up excessive whitespace
  content = content.replace(/\n{3,}/g, "\n\n");

  return content.trim();
}
