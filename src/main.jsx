import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import './index.css';
import ContextProvider from "./components/context/context";


ReactDOM.createRoot(document.getElementById("root")).render(
    <ContextProvider>
        <App />
    </ContextProvider>
)

