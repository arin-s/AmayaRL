import "./style.css";
import * as ROT from "rot-js";

const app = document.getElementById("app");
if (app === null) throw new Error("yadayada");
const display = new ROT.Display({ width: 30, height: 30 });
const displayContainer = display.getContainer();
if (displayContainer === null) throw new Error("yadayada");
app.appendChild(displayContainer);
