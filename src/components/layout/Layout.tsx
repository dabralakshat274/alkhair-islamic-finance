import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Topbar from "./Topbar";
import Header from "./Header";
import Footer from "./Footer";
import MobileMenu from "./MobileMenu";
import ScrollTop from "./ScrollTop";
import FloatingButtons from "./FloatingButtons";

// Same wrapper structure as the OceanWP theme so its CSS applies
export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setMenuOpen(false), [pathname]);
  useEffect(() => {
    document.body.classList.toggle("sidr-open", menuOpen);
    return () => document.body.classList.remove("sidr-open");
  }, [menuOpen]);
  useEffect(() => {
    const onResize = () => window.innerWidth >= 960 && setMenuOpen(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <div id="outer-wrap" className="site clr">
        <a className="skip-link screen-reader-text" href="#main">
          Skip to content
        </a>
        <div id="wrap" className="clr">
          <Topbar />
          <Header menuOpen={menuOpen} onToggleMenu={() => setMenuOpen((v) => !v)} />
          {menuOpen && <div className="oceanwp-sidr-overlay" tabIndex={0} onClick={() => setMenuOpen(false)}></div>}
          <main id="main" className="site-main clr" role="main">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
      <ScrollTop />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <FloatingButtons />
    </>
  );
}
