import { Link } from "react-router-dom";
import { contentImages } from "@/assets";
import type { ElNode } from "@/content/types";
import LoanApplicationForm from "./LoanApplicationForm";

// Turns the node tree in src/content/pages/*.ts back into the Elementor markup the
// original site rendered. Class names are kept verbatim so the copied per-page CSS applies.
export function renderNode(node: ElNode): JSX.Element {
  switch (node.type) {
    case "container":
      return (
        <div key={node.id} className={node.className} data-id={node.id} data-element_type="container" data-e-type="container" data-settings={node.settings}>
          {node.children.map(renderNode)}
        </div>
      );

    case "heading": {
      const Tag = node.tag;
      return (
        <div key={node.id} className={node.className} data-id={node.id} data-element_type="widget" data-e-type="widget" data-widget_type="heading.default">
          <Tag className="elementor-heading-title elementor-size-default">{node.text}</Tag>
        </div>
      );
    }

    case "text":
      return (
        <div
          key={node.id}
          className={node.className}
          data-id={node.id}
          data-element_type="widget"
          data-e-type="widget"
          data-widget_type="text-editor.default"
          dangerouslySetInnerHTML={{ __html: node.html }}
        />
      );

    case "button":
      return (
        <div key={node.id} className={node.className} data-id={node.id} data-element_type="widget" data-e-type="widget" data-widget_type="button.default">
          <Link className="elementor-button elementor-button-link elementor-size-sm" to={node.to}>
            <span className="elementor-button-content-wrapper">
              <span className="elementor-button-text">{node.text}</span>
            </span>
          </Link>
        </div>
      );

    case "image": {
      const img = contentImages[node.image];
      return (
        <div key={node.id} className={node.className} data-id={node.id} data-element_type="widget" data-e-type="widget" data-widget_type="image.default">
          <img decoding="async" width={node.width} height={node.height} src={img.src} srcSet={img.srcSet} sizes={img.sizes} className={node.imgClass} alt={node.alt} />
        </div>
      );
    }

    case "form":
      return (
        <div key={node.id} className={node.className} data-id={node.id} data-element_type="widget" data-e-type="widget" data-widget_type="formidable.default">
          <div className="elementor-widget-container">
            <LoanApplicationForm instanceId={node.id} />
          </div>
        </div>
      );

    case "image-box": {
      const img = contentImages[node.image];
      return (
        <div key={node.id} className={node.className} data-id={node.id} data-element_type="widget" data-e-type="widget" data-widget_type="image-box.default">
          <div className="elementor-image-box-wrapper">
            <figure className="elementor-image-box-img">
              <img decoding="async" src={img.src} title="" alt="" loading="lazy" />
            </figure>
            <div className="elementor-image-box-content">
              <h2 className="elementor-image-box-title">{node.title}</h2>
              <p className="elementor-image-box-description">{node.description}</p>
            </div>
          </div>
        </div>
      );
    }

    case "section":
      return (
        <section key={node.id} className={node.className} data-id={node.id} data-element_type="section" data-e-type="section" data-settings={node.settings}>
          <div className="elementor-container elementor-column-gap-default">
            {node.columns.map((col) => (
              <div key={col.id} className={col.className} data-id={col.id} data-element_type="column" data-e-type="column">
                <div className={col.wrapClass}>{col.children.map(renderNode)}</div>
              </div>
            ))}
          </div>
        </section>
      );
  }
}
