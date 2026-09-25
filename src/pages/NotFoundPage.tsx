import { Link } from "react-router-dom";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useBodyClasses } from "@/hooks/useBodyClasses";
import PageHeader from "@/components/layout/PageHeader";
import { site } from "@/content/site";

const bodyClasses = ["error404", "content-full-screen", "has-topbar", "has-breadcrumbs"];

export default function NotFoundPage() {
  usePageMeta(`Page not found – ${site.name}`, "The page you are looking for does not exist.");
  useBodyClasses(bodyClasses);
  return (
    <>
      <PageHeader title="Page not found" crumb="404" route="/" />
      <div className="container clr" style={{ padding: "60px 0", textAlign: "center" }}>
        <p>The page you are looking for does not exist.</p>
        <Link to="/" className="elementor-button elementor-size-sm" style={{ background: "#166432", color: "#fff", padding: "12px 24px", display: "inline-block" }}>
          Back to Home
        </Link>
      </div>
    </>
  );
}
