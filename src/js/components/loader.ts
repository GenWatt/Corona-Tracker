import { DOMElements } from "../DOMElements.ts";

class Loader {
  public static showLoader() {
    DOMElements.loader.classList.add("show");
  }

  public static hideLoader() {
    DOMElements.loader.classList.remove("show");
  }
}

export default Loader;
