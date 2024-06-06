import "./app.css";
import Router, { Route } from "preact-router";
import { TheGate } from "./rooms/the-gate";
import { titleUpdaterContainerId } from "./utils/title-updater";
import { ClosedDoor } from "./rooms/closed-door";
import { RedRoom } from "./rooms/red-room";
import { useState } from "preact/hooks";

type InventoryItem = "red-key" | "blue-key";

export function App() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const addItem = (item: InventoryItem) =>
    setInventory((prev) => Array.from(new Set([...prev, item])));
  const hasInventory = inventory.length > 0;

  return (
    <>
      <div id={titleUpdaterContainerId} />
      <Router>
        <Route path="/" component={TheGate} />
        <Route path="/closed-door" component={ClosedDoor} />
        <Route
          path="/red-room"
          component={() => (
            <RedRoom
              hasKey={inventory.includes("red-key")}
              onGetKey={() => addItem("red-key")}
            />
          )}
        />
      </Router>
      <div aria-live="polite">
        <h2>Inventory</h2>
        {hasInventory ? (
          <ul>
            {inventory.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : (
          <p>Inventory is empty</p>
        )}
      </div>
    </>
  );
}
