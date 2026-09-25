import { Link, NavLink } from "react-router-dom";
import { logoImages } from "@/assets";
import { site } from "@/content/site";
import { mainMenu } from "@/content/navigation";

type Props = { menuOpen: boolean; onToggleMenu: () => void };

export default function Header({ menuOpen, onToggleMenu }: Props) {
  return (
    <header id="site-header" className="minimal-header clr" data-height="49" role="banner">
      <div id="site-header-inner" className="clr ">
        <div id="site-logo" className="clr has-responsive-logo">
          <div id="site-logo-inner" className="clr">
            <Link to="/" className="custom-logo-link" rel="home">
              <img
                width="510"
                height="290"
                src={logoImages.logo}
                className="custom-logo"
                alt={site.logoAlt}
                decoding="async"
                srcSet={`${logoImages.logo} 1x, ${logoImages.logo} 2x`}
                sizes="(max-width: 510px) 100vw, 510px"
              />
            </Link>
            <Link to="/" className="responsive-logo-link" rel="home">
              <img src={logoImages.logo} className="responsive-logo" alt="" />
            </Link>
          </div>
        </div>
        <div id="site-navigation-wrap" className="clr">
          <nav id="site-navigation" className="navigation main-navigation clr" role="navigation">
            <ul id="menu-main-menu" className="main-menu dropdown-menu sf-menu">
              {mainMenu.map((item) => (
                <li key={item.label + item.to} className={`menu-item menu-item-type-post_type menu-item-object-page${item.to === "/" ? " menu-item-home" : ""}`}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) => `menu-link${isActive ? " current-menu-item" : ""}`}
                    end={item.to === "/"}
                  >
                    <span className="text-wrap">{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="oceanwp-mobile-menu-icon clr mobile-right">
          <a
            href="#mobile-menu-toggle"
            className={`mobile-menu${menuOpen ? " opened" : ""}`}
            aria-label="Mobile Menu"
            aria-expanded={menuOpen}
            onClick={(e) => {
              e.preventDefault();
              onToggleMenu();
            }}
          >
            <i className="fa fa-bars" aria-hidden="true"></i>
            <span className="oceanwp-text">Menu</span>
            <span className="oceanwp-close-text">Close</span>
          </a>
        </div>
      </div>
    </header>
  );
}
