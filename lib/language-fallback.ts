export interface ContentWithFallback<T> {
  primary: T | null;
  fallback: T | null;
  content: T | null;
}

/**
 * Get content with language fallback
 * If the requested language content is empty/null, return the English version
 */
export function getContentWithFallback<T>(
  primaryContent: T | null | undefined,
  fallbackContent: T | null | undefined
): T | null {
  // Check if primary content exists and is not empty
  if (primaryContent) {
    // For arrays (like PortableText), check if they have content
    if (Array.isArray(primaryContent)) {
      return primaryContent.length > 0
        ? primaryContent
        : fallbackContent || null;
    }
    // For strings, check if they're not just whitespace
    if (typeof primaryContent === "string") {
      return primaryContent.trim() ? primaryContent : fallbackContent || null;
    }
    // For other types, return if truthy
    return primaryContent;
  }

  return fallbackContent || null;
}

/**
 * Fetch content with language fallback from Sanity
 */
export async function fetchWithLanguageFallback(
  sanityClient: { fetch: (query: string) => Promise<unknown> },
  query: string,
  language: "en" | "ms"
): Promise<unknown> {
  const fallbackLanguage = language === "ms" ? "en" : "ms";

  // First try to get content in the requested language
  const primaryQuery = query.replace(
    "LANGUAGE_PLACEHOLDER",
    `language == "${language}"`
  );
  const primaryContent = await sanityClient.fetch(primaryQuery);

  // If no content found, try fallback language
  if (
    !primaryContent ||
    (Array.isArray(primaryContent) && primaryContent.length === 0)
  ) {
    const fallbackQuery = query.replace(
      "LANGUAGE_PLACEHOLDER",
      `language == "${fallbackLanguage}"`
    );
    return await sanityClient.fetch(fallbackQuery);
  }

  return primaryContent;
}

/**
 * Enhanced fetch that gets both language versions and merges them
 */
export async function fetchWithSmartFallback(
  sanityClient: { fetch: (query: string) => Promise<unknown> },
  baseQuery: string,
  language: "en" | "ms"
): Promise<unknown> {
  const fallbackLanguage = language === "ms" ? "en" : "ms";

  // Fetch both versions
  const [primaryContent, fallbackContent] = await Promise.all([
    sanityClient.fetch(
      baseQuery.replace("LANGUAGE_PLACEHOLDER", `language == "${language}"`)
    ),
    sanityClient.fetch(
      baseQuery.replace(
        "LANGUAGE_PLACEHOLDER",
        `language == "${fallbackLanguage}"`
      )
    ),
  ]);

  // If we have arrays, merge them with fallback logic
  if (Array.isArray(primaryContent) && Array.isArray(fallbackContent)) {
    const mergedContent = [...primaryContent];

    // Add fallback items that don't have primary language equivalents
    fallbackContent.forEach((fallbackItem) => {
      const hasEquivalent = primaryContent.some(
        (primaryItem) =>
          primaryItem.slug?.current === fallbackItem.slug?.current ||
          primaryItem._id === fallbackItem._id
      );

      if (!hasEquivalent) {
        mergedContent.push({
          ...fallbackItem,
          _isFallback: true, // Mark as fallback content
        });
      }
    });

    return mergedContent;
  }

  // For single items, return primary or fallback
  return primaryContent || fallbackContent;
}
