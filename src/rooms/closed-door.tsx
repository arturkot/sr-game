import { useState } from "preact/hooks";
import { TitleUpdater } from "../utils/title-updater";
import { Link } from "preact-router";
import { InventoryItem } from "../types";

type Props = {
  inventory: InventoryItem[];
};

export const ClosedDoor = ({ inventory }: Props) => {
  const [displayInfo, setDisplayInfo] = useState(false);
  const hasRedKey = inventory.includes("red-key");
  const hasBlueKey = inventory.includes("blue-key");
  const isOpen = hasRedKey && hasBlueKey;
  const feedbackId = "door-feedback";

  const handleOpeningDoor = () => {
    setDisplayInfo(true);
  };

  return (
    <>
      <TitleUpdater title="Closed Door" />
      <h1>Closed Door</h1>
      <p>
        You're in a brightly lit room. There is a door in front of you. On your
        left, there is a door with a <i>Red</i> handle. On your right, there is
        a door with a <i>Blue</i> handle.
      </p>
      {isOpen ? (
        <Link href="/success">Open Door</Link>
      ) : (
        <button
          type="button"
          aria-disabled={true}
          onClick={handleOpeningDoor}
          aria-describedby={displayInfo ? feedbackId : undefined}
        >
          Open Door
        </button>
      )}
      <div aria-live="assertive">
        <p id={feedbackId} hidden={!displayInfo}>
          The door is locked. You need{" "}
          {hasBlueKey ? (
            ""
          ) : (
            <>
              a <i>Blue</i> key
            </>
          )}
          {!hasBlueKey && !hasRedKey ? "and " : ""}
          {hasRedKey ? (
            ""
          ) : (
            <>
              {" "}
              a <i>Red</i> key
            </>
          )}{" "}
          to open it.
        </p>
      </div>
      <Link href="/red-room">Go to the Red Room</Link>
      <Link href="/blue-room">Go to the Blue Room</Link>
    </>
  );
};
