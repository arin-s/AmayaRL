import "./style.css";
import * as ROT from "rot-js";

// Constants for our game
const DISPLAY_WIDTH = 40;
const DISPLAY_HEIGHT = 25;
const TILE_SIZE = 16;

// Map generation parameters
const MAP_WIDTH = 40;
const MAP_HEIGHT = 25;

// Initialize the display with tile options
const displayOptions = {
  width: DISPLAY_WIDTH,
  height: DISPLAY_HEIGHT,
  layout: "tile" as const,
  tileWidth: TILE_SIZE,
  tileHeight: TILE_SIZE,
  tileSet: null as HTMLImageElement | null,
  tileMap: {},
  tileColorize: false
};

// Load the tileset
const tilesetImage = document.createElement("img");
tilesetImage.onload = () => {
  console.log("Tileset loaded successfully!", tilesetImage.width, tilesetImage.height);
  displayOptions.tileSet = tilesetImage;

  // After loading the tileset, create the display
  createDisplayAndDrawMap();
};
tilesetImage.onerror = (e) => {
  console.error("Failed to load tileset:", e);
};
tilesetImage.src = "./Tilesheet/colored.png";

// Create display and draw map
function createDisplayAndDrawMap() {
  // Update tileMap with loaded tileset
  displayOptions.tileMap = {
    wall: [20 * 17, 0],  // Wall tile at x=21 (accounting for 1px spacing)
    floor: [1 * 17, 0]   // Floor tile at x=1 (accounting for 1px spacing)
  };

  // Create the display
  const app = document.getElementById("app");
  if (app === null) throw new Error("Could not find app element");
  const display = new ROT.Display(displayOptions);
  const displayContainer = display.getContainer();
  if (displayContainer === null) throw new Error("Could not get display container");
  app.appendChild(displayContainer);

  // Generate a simple dungeon map
  const map: { [key: string]: number } = {};
  const digger = new ROT.Map.Digger(MAP_WIDTH, MAP_HEIGHT);

  // Callback for the map generator
  const digCallback = (x: number, y: number, value: number) => {
    const key = `${x.toString()},${y.toString()}`;
    map[key] = value;
  };

  // Generate the map
  digger.create(digCallback);

  // Draw the map
  const drawMap = () => {
    // Clear the display
    display.clear();

    // Draw each cell
    for (const key in map) {
      const [x, y] = key.split(",").map(Number);
      const isWall = map[key] === 1;

      display.draw(
        x,
        y,
        isWall ? "wall" : "floor",
        "#fff",  // Keep full brightness for tiles
        null     // No background color needed for tiles
      );
    }
  };

  // Initial draw
  drawMap();
}
