// Page content is a tree of Elementor-style nodes. The renderer in
// src/components/elementor/ElementorRenderer.tsx turns it back into the same markup
// the original site produced, so the copied Elementor CSS applies unchanged.

export type ImageKey = "hero" | "office" | "iconLocation" | "iconPhone" | "iconContact";

type Base = { id: string; className: string; settings?: string };

export type ContainerNode = Base & { type: "container"; children: ElNode[] };
export type HeadingNode = Base & { type: "heading"; tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"; text: string };
export type TextNode = Base & { type: "text"; html: string };
export type ButtonNode = Base & { type: "button"; to: string; text: string };
export type ImageNode = Base & { type: "image"; image: ImageKey; width: number; height: number; alt: string; imgClass: string };
export type FormNode = Base & { type: "form" };
export type ImageBoxNode = Base & { type: "image-box"; image: ImageKey; title: string; description: string };
export type SectionNode = Base & {
  type: "section";
  columns: { id: string; className: string; wrapClass: string; children: ElNode[] }[];
};

export type ElNode = ContainerNode | HeadingNode | TextNode | ButtonNode | ImageNode | FormNode | ImageBoxNode | SectionNode;

export type PageContent = {
  key: string;
  route: string;
  postId: number;
  elementorType: string;
  title: string;
  description: string;
  keywords: string;
  bodyClasses: string[];
  pageHeader: { title: string; crumb: string } | null;
  nodes: ElNode[];
};
