import { createRoot } from "react-dom/client";
import App from "./components/App";
import "./index.css";
import { store } from "./store";
import { Provider } from "react-redux";
const el = document.getElementById("root") as HTMLElement;
const root = createRoot(el);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
