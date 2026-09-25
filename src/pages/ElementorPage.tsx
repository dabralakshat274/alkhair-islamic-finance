import type { PageContent } from "@/content/types";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useBodyClasses } from "@/hooks/useBodyClasses";
import PageHeader from "@/components/layout/PageHeader";
import { renderNode } from "@/components/elementor/ElementorRenderer";

// Renders one page from its content file (src/content/pages/*.ts)
export default function ElementorPage({ page }: { page: PageContent }) {
  usePageMeta(page.title, page.description, page.keywords);
  useBodyClasses(page.bodyClasses);
  return (
    <>
      {page.pageHeader && <PageHeader title={page.pageHeader.title} crumb={page.pageHeader.crumb} route={page.route} />}
      <div data-elementor-type={page.elementorType} data-elementor-id={page.postId} className={`elementor elementor-${page.postId}`}>
        {page.nodes.map(renderNode)}
      </div>
    </>
  );
}
