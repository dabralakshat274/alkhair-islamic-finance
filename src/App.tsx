import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ScrollRestoration from "@/components/layout/ScrollRestoration";
import ElementorPage from "@/pages/ElementorPage";
import NotFoundPage from "@/pages/NotFoundPage";
import { pages } from "@/content/pages";
import { redirects } from "@/content/navigation";

export default function App() {
  return (
    <>
      <ScrollRestoration />
      <Routes>
        <Route element={<Layout />}>
          {pages.map((page) => (
            <Route key={page.key} path={page.route} element={<ElementorPage page={page} />} />
          ))}
          {Object.entries(redirects).map(([from, to]) => (
            <Route key={from} path={from} element={<Navigate to={to} replace />} />
          ))}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}
