import Router, { Route } from "preact-router";
import { TheGate } from "./rooms/the-gate";
import { titleUpdaterContainerId } from "./utils/title-updater";
import { ClosedDoor } from "./rooms/closed-door";
import { RedRoom } from "./rooms/red-room";
import { useState } from "preact/hooks";
import { BlueRoom } from "./rooms/blue-room";
import { InventoryItem } from "./types";
import { Success } from "./rooms/success";
import { Intro } from "./rooms/intro";

const itemDictionary: Record<InventoryItem, string> = {
  "red-key": "Red Key",
  "blue-key": "Blue Key",
};

export function App() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const addItem = (item: InventoryItem) =>
    setInventory((prev) => Array.from(new Set([...prev, item])));
  const hasInventory = inventory.length > 0;

  return (
    <>
      <div id={titleUpdaterContainerId} />
      <Router>
        <Route path="/" component={Intro} />
        <Route path="/the-gate" component={TheGate} />
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
      <section
        aria-live="polite"
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
        }}
      >
        <h2>Inventory</h2>
        {hasInventory ? (
          <ul>
            {inventory.map((item) => (
              <li key={item}>{itemDictionary[item]}</li>
            ))}
          </ul>
        ) : (
          <p>Inventory is empty</p>
        )}
      </section>
    </>
  );
}
