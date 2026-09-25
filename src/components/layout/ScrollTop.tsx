import { useScrollY } from "@/hooks/useScrollY";

export default function ScrollTop() {
  const show = useScrollY() > 100;
  return (
    <a
      aria-label="Scroll to the top of the page"
      href="#"
      id="scroll-top"
      className="scroll-top-right"
      style={{ display: show ? "block" : "none", opacity: show ? 1 : 0 }}
      onClick={(e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <i className=" fa fa-chevron-up" aria-hidden="true" role="img"></i>
    </a>
  );
}
