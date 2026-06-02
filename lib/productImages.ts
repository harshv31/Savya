import fs from 'node:fs';
import path from 'node:path';

/**
 * SERVER-ONLY. Auto-discovers a product's real photos dropped into
 * `public/products/<slug>/`. Any .jpg/.jpeg/.png/.webp/.avif files found there
 * are returned (sorted by filename) as public paths. If the folder is empty or
 * missing, returns [] and callers fall back to the curated placeholder imagery.
 *
 * To use your own Instagram / studio photos: drop files into
 *   public/products/<product-slug>/01.jpg, 02.jpg, ...
 * Filenames sort alphabetically, so number them to control order.
 */
export function localProductImages(slug: string): string[] {
  try {
    const dir = path.join(process.cwd(), 'public', 'products', slug);
    return fs
      .readdirSync(dir)
      .filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map((f) => `/products/${slug}/${f}`);
  } catch {
    return [];
  }
}

/**
 * Returns the images to use for a product: real local photos when present,
 * otherwise the curated fallback ids from the product data.
 */
export function resolveProductImages(slug: string, fallback: string[]): string[] {
  const local = localProductImages(slug);
  return local.length > 0 ? local : fallback;
}
