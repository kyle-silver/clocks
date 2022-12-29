import { Concentric } from "./Concentric/Concentric";
import { Timescale } from "./Timescale/Timescale";
import { createHashRouter, redirect, RouterProvider } from "react-router-dom";

import "./css/Concentric.css";
import "./css/Timescale.css";
import "./css/TimescaleScaling.css";

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
    loader: async () => {
      return redirect("https://kyle-silver.github.io/blog/clocks");
    },
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
