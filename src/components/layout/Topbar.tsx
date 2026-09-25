import { Link } from "react-router-dom";
import { site } from "@/content/site";

// The two buttons in the dark strip above the header (inline styles kept from the original)
export default function Topbar() {
  return (
    <div id="top-bar-wrap" className="clr">
      <div id="top-bar" className="clr container">
        <div id="top-bar-inner" className="clr">
          <div id="top-bar-content" className="clr has-content top-bar-right">
            <span className="topbar-content">
              <a
                href={`tel:${site.phone}`}
                style={{ backgroundColor: "#1583dd", color: "white", padding: "10px 17px", textAlign: "center", fontSize: 16 }}
              >
                {site.topbar.callLabel}
              </a>
              <Link
                to="/contact"
                style={{ backgroundColor: "RED", color: "BLACK", padding: "10px 17px", textAlign: "center", fontSize: 12 }}
              >
                {site.topbar.applyLabel}
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
