import * as React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { AppProvider as App } from "@providers/app-provider";
import { SnackbarProvider } from "notistack";
import { toJS } from "mobx";
import "./app.css";

const target = document.getElementById("root");

(async () => {
  if (!target) return;
  return render(
    <BrowserRouter>
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </BrowserRouter>,
    target
  );
})();

window.mobxJson = (data: any) => console.log(toJS(data));

declare global {
  interface Window {
    mobxJson(data: any): void;
  }
}

export default {};
