import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

// Для GitHub Pages basename має відповідати назві репозиторію, а для локалхосту — порожній рядок
const basename = import.meta.env.DEV ? "" : "/HW-28-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
   <BrowserRouter basename="/HM_28/"></BrowserRouter>
  </React.StrictMode>
);
