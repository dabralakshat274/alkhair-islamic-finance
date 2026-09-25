import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// Stylesheets in the order the original WordPress page loaded them
import "./styles/wp-inline.css";
import "./vendor/wp-content/plugins/formidable/css/formidableforms.css";
import "./vendor/wp-content/plugins/all-in-one-seo-pack/dist/Lite/assets/css/table-of-contents/global.e90f6d47.css";
import "./vendor/wp-content/plugins/amin-chat-button/style.css";
import "./vendor/wp-content/themes/oceanwp/assets/fonts/fontawesome/css/all.min.css";
import "./vendor/wp-content/themes/oceanwp/assets/css/third/simple-line-icons.min.css";
import "./vendor/wp-content/themes/oceanwp/assets/css/style.min.css";
import "./vendor/wp-content/plugins/elementor/assets/css/frontend.min.css";
import "./vendor/wp-content/uploads/elementor/css/post-9.css";
import "./vendor/wp-content/plugins/elementor/assets/css/widget-heading.min.css";
import "./vendor/wp-content/plugins/elementor/assets/css/widget-image.min.css";
import "./vendor/wp-content/plugins/elementor/assets/css/widget-image-box.min.css";
import "./vendor/wp-content/uploads/elementor/css/post-161.css";
import "./vendor/wp-content/uploads/elementor/css/post-354.css";
import "./vendor/wp-content/uploads/elementor/css/post-883.css";
import "./vendor/wp-content/uploads/elementor/css/post-885.css";
import "./vendor/wp-content/uploads/elementor/css/post-887.css";
import "./vendor/wp-content/uploads/elementor/css/post-889.css";
import "./vendor/wp-content/uploads/elementor/css/post-891.css";
import "./vendor/wp-content/uploads/elementor/css/post-895.css";
import "./vendor/wp-content/plugins/ocean-extra/assets/css/widgets.css";
import "./vendor/wp-content/plugins/call-now-button/resources/style/modern.css";
import "./styles/theme-customizer.css";
import "./styles/site.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
