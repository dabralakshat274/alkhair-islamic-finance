import { Link } from "react-router-dom";
import { mainMenu } from "@/content/navigation";

type Props = { open: boolean; onClose: () => void };

// Slide-in panel with the same class names the theme's sidr script generated,
// so the theme CSS (colours, spacing, close bar) applies as on the original.
export default function MobileMenu({ open, onClose }: Props) {
  return (
    <div id="sidr" className={`sidr right${open ? " sidr-visible" : ""}`} aria-hidden={!open}>
      <div className="sidr-inner">
        <div id="sidr-id-sidr-close">
          <a
            href="#sidr-menu-close"
            className="sidr-class-toggle-sidr-close"
            aria-label="Close mobile menu"
            onClick={(e) => {
              e.preventDefault();
              onClose();
            }}
          >
            <i className="sidr-class-icon fa fa-times" aria-hidden="true"></i>
            <span className="sidr-class-close-text">Close Menu</span>
          </a>
        </div>
        <nav id="sidr-id-site-navigation" className="sidr-class-navigation sidr-class-main-navigation sidr-class-clr" role="navigation">
          <ul id="sidr-id-menu-main-menu" className="sidr-class-main-menu sidr-class-dropdown-menu sidr-class-sf-menu">
            {mainMenu.map((item) => (
              <li key={item.label + item.to} className="sidr-class-menu-item sidr-class-menu-item-type-post_type sidr-class-menu-item-object-page">
                <Link to={item.to} className="sidr-class-menu-link" onClick={onClose}>
                  <span className="sidr-class-text-wrap">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
