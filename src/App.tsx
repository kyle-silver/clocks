import { Concentric } from "./Concentric/Concentric";
import { Timescale } from "./Timescale/Timescale";
import { createHashRouter, RouterProvider } from "react-router-dom";

import "./css/Concentric.css";
import "./css/ConcentricScaling.css";
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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
