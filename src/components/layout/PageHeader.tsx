import { Link } from "react-router-dom";

type Props = { title: string; crumb: string; route: string };

// Page title bar with breadcrumbs, shown on every page except Home
export default function PageHeader({ title, crumb, route }: Props) {
  return (
    <header className="page-header">
      <div className="container clr page-header-inner">
        <h1 className="page-header-title clr">{title}</h1>
        <nav role="navigation" aria-label="Breadcrumbs" className="site-breadcrumbs clr position-">
          <ol className="trail-items">
            <li className="trail-item trail-begin">
              <Link to="/" rel="home" aria-label="Home">
                <span>
                  <i className=" fas fa-home" aria-hidden="true" role="img"></i>
                  <span className="breadcrumb-home has-icon">Home</span>
                </span>
              </Link>
              <span className="breadcrumb-sep">&gt;</span>
            </li>
            <li className="trail-item trail-end">
              <span>
                <Link to={route}>{crumb}</Link>
              </span>
            </li>
          </ol>
        </nav>
      </div>
    </header>
  );
}
