import logo from "./images/logo.png";
import logo270 from "./images/logo-270.png";
import logo192 from "./images/logo-192.png";
import logo180 from "./images/logo-180.png";
import hero from "./images/hero.webp";
import hero200 from "./images/hero-200x300.webp";
import office from "./images/office.jpeg";
import office300 from "./images/office-300x183.jpeg";
import iconLocation from "./images/icon-location.png";
import iconPhone from "./images/icon-phone.png";
import iconContact from "./images/icon-contact.png";
import type { ImageKey } from "@/content/types";

export const logoImages = { logo, logo270, logo192, logo180 };

// Content images referenced by key from src/content/pages/*.ts
export const contentImages: Record<ImageKey, { src: string; srcSet?: string; sizes?: string }> = {
  hero: { src: hero, srcSet: `${hero} 400w, ${hero200} 200w`, sizes: "(max-width: 400px) 100vw, 400px" },
  office: { src: office, srcSet: `${office} 696w, ${office300} 300w`, sizes: "(max-width: 696px) 100vw, 696px" },
  iconLocation: { src: iconLocation },
  iconPhone: { src: iconPhone },
  iconContact: { src: iconContact },
};
