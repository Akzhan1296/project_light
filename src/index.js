import "@babel/polyfill";
import "nodelist-foreach-polyfill";
import "formdata-polyfill";
import "es6-promise";
import "fetch-polyfill";
import elementClosest from "element-closest";
elementClosest(window);

//project modules
import Accordion from "./modules/accordion";
import {calc} from "./modules/calc";
import popups from "./modules/popups";
import validation from "./modules/validation";



document.addEventListener("DOMContentLoaded", () => {
  const firstAccord = new Accordion("#accordion", true, ".construct-btn");
  firstAccord.event();

  const SecondAccord = new Accordion("#accordion-two", false);
  SecondAccord.event();

  calc();
  popups();
  validation();

});
