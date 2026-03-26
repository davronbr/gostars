
'use client';

/**
 * Global cache for Lottie animation data to prevent redundant network requests.
 */
const lottieCache: Record<string, any> = {};

/**
 * Fetches Lottie JSON data with caching.
 * @param url The URL of the Lottie JSON file.
 * @returns A promise that resolves to the animation data.
 */
export async function fetchLottieData(url: string): Promise<any> {
  if (lottieCache[url]) {
    return lottieCache[url];
  }

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch Lottie from ${url}`);
    const data = await response.json();
    lottieCache[url] = data;
    return data;
  } catch (error) {
    console.error('Lottie fetch error:', error);
    return null;
  }
}
