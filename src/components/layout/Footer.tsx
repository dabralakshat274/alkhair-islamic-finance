import { Link, NavLink } from "react-router-dom";
import { site } from "@/content/site";
import { footerLinks, mainMenu } from "@/content/navigation";

export default function Footer() {
  return (
    <footer id="footer" className="site-footer" role="contentinfo">
      <div id="footer-inner" className="clr">
        <div id="footer-widgets" className="oceanwp-row clr tablet-2-col mobile-1-col">
          <div className="footer-widgets-inner container">
            <div className="footer-box span_1_of_3 col col-1">
              <div id="text-0" className="footer-widget widget_text clr">
                <h3 className="widget-title">{site.footer.aboutTitle}</h3>
                <div className="textwidget">{site.footer.about}</div>
              </div>
            </div>
            <div className="footer-box span_1_of_3 col col-2">
              <div id="ocean_custom_links-0" className="footer-widget widget-oceanwp-custom-links custom-links-widget clr">
                <h3 className="widget-title">{site.footer.linksTitle}</h3>
                <ul className="oceanwp-custom-links">
                  {footerLinks.map((item, i) => (
                    <li key={i}>
                      <Link to={item.to}>{item.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="footer-box span_1_of_3 col col-3 ">
              <div id="ocean_contact_info-0" className="footer-widget widget-oceanwp-contact-info clr">
                <h3 className="widget-title">{site.footer.contactTitle}</h3>
                <ul className="contact-info-widget default">
                  <li className="text">Address :- {site.address}</li>
                  <li className="address">
                    <i className="icon-location-pin" aria-hidden="true"></i>
                    <div className="oceanwp-info-wrap">
                      <span className="oceanwp-contact-title">Address:</span>
                      <span className="oceanwp-contact-text">{site.addressShort}</span>
                    </div>
                  </li>
                  <li className="phone">
                    <i className="icon-phone" aria-hidden="true"></i>
                    <div className="oceanwp-info-wrap">
                      <span className="oceanwp-contact-title">Phone:</span>
                      <span className="oceanwp-contact-text">{site.phone}</span>
                    </div>
                  </li>
                  <li className="email">
                    <i className="icon-envelope" aria-hidden="true"></i>
                    <div className="oceanwp-info-wrap">
                      <span className="oceanwp-contact-title">Email:</span>
                      <span className="oceanwp-contact-text">
                        <a href={`mailto:${site.email}`}>{site.email}</a>
                        <span className="screen-reader-text">Opens in your application</span>
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div id="footer-bottom" className="clr">
          <div id="footer-bottom-inner" className="container clr">
            <div id="footer-bottom-menu" className="navigation clr">
              <div className="menu-footer-menu-container">
                <ul id="menu-footer-menu" className="menu">
                  {mainMenu.map((item) => (
                    <li key={item.label + item.to} className={`menu-item menu-item-type-post_type menu-item-object-page${item.to === "/" ? " menu-item-home" : ""}`}>
                      <NavLink to={item.to} end={item.to === "/"}>
                        {item.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div id="copyright" className="clr" role="contentinfo">
              {site.footer.copyright} <Link to={site.footer.copyrightLink.to}>{site.footer.copyrightLink.label}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
