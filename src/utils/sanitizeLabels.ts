/**
 * Customer-Facing Label & Description Sanitizer
 * Prevents raw filenames (e.g. "diamond 222", "diamond 22", "diamond", file extensions)
 * from being displayed as public headings, captions, or descriptions.
 */

export function sanitizePublicLabel(label?: string | null, fallback = ''): string {
  if (!label || typeof label !== 'string') return fallback;

  let cleaned = label
    // Remove filename parentheticals like (diamond 222), (diamond 22), (diamond.jpg)
    .replace(/\s*\(\s*diamond\s*222\s*\)/gi, '')
    .replace(/\s*\(\s*diamond\s*22\s*\)/gi, '')
    .replace(/\s*\(\s*diamond(?:\.jpg|\.png)?\s*\)/gi, '')
    .replace(/\s*\(\s*dimaond[^)]*\)/gi, '')
    .replace(/\s*\(\s*dimaod[^)]*\)/gi, '')
    // Replace standalone internal slugs with customer friendly titles
    .replace(/\bdiamond\s*222\b/gi, 'Guest Room')
    .replace(/\bdiamond\s*22\b/gi, 'Hotel Interior')
    // Remove common file extension patterns if present in text
    .replace(/\.(?:jpg|jpeg|png|webp|svg|gif)\b/gi, '')
    // Clean up excessive whitespace or trailing punctuation
    .trim();

  // If cleaning leaves it empty or it was just a file name
  if (!cleaned || cleaned.toLowerCase() === 'diamond') {
    return fallback || 'Hotel Diamond';
  }

  return cleaned;
}

export function sanitizePublicDescription(desc?: string | null, fallback = ''): string {
  if (!desc || typeof desc !== 'string') return fallback;

  return desc
    .replace(/\s*\(\s*diamond\s*222\s*\)/gi, '')
    .replace(/\s*\(\s*diamond\s*22\s*\)/gi, '')
    .replace(/\s*\(\s*diamond(?:\.jpg|\.png)?\s*\)/gi, '')
    .replace(/\bdiamond\s*222\b/gi, 'guest room')
    .replace(/\bdiamond\s*22\b/gi, 'hotel interior')
    .replace(/\.(?:jpg|jpeg|png|webp|svg|gif)\b/gi, '')
    .trim();
}
