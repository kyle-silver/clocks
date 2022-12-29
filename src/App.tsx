import { Concentric } from "./Concentric/Concentric";
import { Timescale } from "./Timescale/Timescale";
import { createHashRouter, RouterProvider } from "react-router-dom";

import "./css/Concentric.css";
import "./css/Timescale.css";

/**
 * The "homepage" for navigating between different clocks is the blog post on
 * the statically-generated main site -- not part of this react app.
 */
function RedirectOnNotFound(): JSX.Element | null {
  window.location.href = "https://kyle-silver.github.io/blog/clocks";
  return null;
}

const router = createHashRouter([
  {
    path: "timescale",
    element: <Timescale />,
  },
  {
    path: "concentric",
    element: <Concentric />,
  },
  {
    path: "*",
    element: <RedirectOnNotFound />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
