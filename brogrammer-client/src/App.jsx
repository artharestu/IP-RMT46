import { router } from "./routers";
import { RouterProvider } from "react-router-dom";
import "./styles/index.css";
import "toastify-js/src/toastify.css";
import { store } from "./store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
