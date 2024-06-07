import Router from "preact-router";
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
  const [counterStart, setCounterStart] = useState(0);

  return (
    <>
      <div id={titleUpdaterContainerId} />
      <Router>
        <Intro path="/" />
        <TheGate
          path="/the-gate"
          onActivate={() => setCounterStart(Date.now())}
        />
        <ClosedDoor
          path="/closed-door"
          counterStart={counterStart}
          inventory={inventory}
        />
        <RedRoom
          counterStart={counterStart}
          path="/red-room"
          hasKey={inventory.includes("red-key")}
          onGetKey={() => addItem("red-key")}
        />
        <BlueRoom
          counterStart={counterStart}
          path="/blue-room"
          hasKey={inventory.includes("blue-key")}
          onGetKey={() => addItem("blue-key")}
        />
        <Success path="/success" counterStart={counterStart} />
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
