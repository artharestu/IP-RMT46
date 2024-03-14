import { router } from "./routers";
import { RouterProvider } from "react-router-dom";
import "./styles/index.css";
import "toastify-js/src/toastify.css";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
