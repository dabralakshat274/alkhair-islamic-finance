import { site, whatsappUrl } from "@/content/site";
import { callIcon, whatsappIcon } from "@/content/floatingButtons";

// WhatsApp (bottom-left) and Call Us (bottom-right) buttons, markup as the original plugins produced
export default function FloatingButtons() {
  return (
    <>
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer nofollow" id="cbp-whatsapp-button" className="cbp-whatsapp-button cbp-left-bottom puls">
        <div style={{ backgroundColor: "#ffffff00", padding: 0 }}>
          <div className="cbp-text-button">
            <img src={whatsappIcon} alt="" />
            <span>WhatsApp</span>
          </div>
        </div>
      </a>
      <a
        href={`tel:${site.phoneSpaced}`}
        id="callnowbutton"
        className="call-now-button  cnb-zoom-100  cnb-zindex-10  cnb-text  cnb-single cnb-right cnb-displaymode cnb-displaymode-always"
        style={{ backgroundImage: `url(${callIcon})`, backgroundColor: "#008A00" }}
      >
        <span>Call Us</span>
      </a>
    </>
  );
}
