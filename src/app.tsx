import Router, { Route } from "preact-router";
import { TheGate } from "./rooms/the-gate";
import { titleUpdaterContainerId } from "./utils/title-updater";
import { ClosedDoor } from "./rooms/closed-door";
import { RedRoom } from "./rooms/red-room";
import { useState } from "preact/hooks";
import { BlueRoom } from "./rooms/blue-room";
import { InventoryItem } from "./types";
import { Success } from "./rooms/success";

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
        <Route
          path="/closed-door"
          component={() => <ClosedDoor inventory={inventory} />}
        />
        <Route
          path="/red-room"
          component={() => (
            <RedRoom
              hasKey={inventory.includes("red-key")}
              onGetKey={() => addItem("red-key")}
            />
          )}
        />
        <Route
          path="/blue-room"
          component={() => (
            <BlueRoom
              hasKey={inventory.includes("blue-key")}
              onGetKey={() => addItem("blue-key")}
            />
          )}
        />
        <Route path="/success" component={Success} />
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
