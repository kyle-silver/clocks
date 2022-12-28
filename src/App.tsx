import { Concentric } from "./Concentric/Concentric";
import { Timescale } from "./Timescale/Timescale";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./css/Concentric.css";
import "./css/ConcentricScaling.css";
import "./css/Timescale.css";
import "./css/TimescaleScaling.css";

const router = createBrowserRouter([
  {
    path: "/timescale",
    element: <Timescale />,
  },
  {
    path: "/concentric",
    element: <Concentric />,
  },
]);

function App() {
  // return <Timescale />;
  // return <Concentric />;
  return <RouterProvider router={router} />;
}

export default App;
