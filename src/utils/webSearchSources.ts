export function getWebSearchSourceDisplayTitle(title: string, url: string) {
  const normalizedTitle = title.trim();

  if (normalizedTitle && normalizedTitle !== url) {
    return normalizedTitle;
  }

  try {
    const hostname = new URL(url).hostname.replace(/^www\./, "");
    return hostname || url;
  } catch {
    return normalizedTitle || url;
  }
}
