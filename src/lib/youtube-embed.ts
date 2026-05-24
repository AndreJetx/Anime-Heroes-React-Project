/** Converte URL ou ID do YouTube em URL de embed para iframe. */
export function toYoutubeEmbedUrl(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  if (/^[\w-]{11}$/.test(trimmed)) {
    return `https://www.youtube.com/embed/${trimmed}?rel=0&autoplay=1`;
  }

  try {
    const url = new URL(trimmed);
    const host = url.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const id = url.pathname.slice(1).split("/")[0];
      return id ? `https://www.youtube.com/embed/${id}?rel=0&autoplay=1` : null;
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      if (url.pathname === "/watch") {
        const id = url.searchParams.get("v");
        return id ? `https://www.youtube.com/embed/${id}?rel=0&autoplay=1` : null;
      }
      if (url.pathname.startsWith("/embed/")) {
        const sep = trimmed.includes("?") ? "&" : "?";
        return `${trimmed}${sep}autoplay=1`;
      }
      if (url.pathname.startsWith("/shorts/")) {
        const id = url.pathname.split("/")[2];
        return id ? `https://www.youtube.com/embed/${id}?rel=0&autoplay=1` : null;
      }
    }
  } catch {
    return null;
  }

  return null;
}
