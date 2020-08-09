import { DOMElements } from "../DOMElements.ts";

class Error {
  public static showError(msg: string) {
    DOMElements.error.classList.add("show");
    DOMElements.error.innerText = msg;
  }

  public static hideError() {
    DOMElements.error.classList.remove("show");
    DOMElements.error.innerText = "";
  }
}

export default Error;
