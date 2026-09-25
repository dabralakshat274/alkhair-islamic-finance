import { useEffect } from "react";

function setMeta(name: string, content: string) {
  let meta = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = name;
    document.head.appendChild(meta);
  }
  meta.content = content;
}

// Sets the document title, description and keywords for a page
export function usePageMeta(title: string, description: string, keywords?: string) {
  useEffect(() => {
    document.title = title;
    setMeta("description", description);
    if (keywords) setMeta("keywords", keywords);
  }, [title, description, keywords]);
}
