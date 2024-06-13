import { useEffect, useState } from "preact/hooks";
import { TitleUpdater } from "../utils/title-updater";
import { Link, route } from "preact-router";
import { InventoryItem } from "../types";
import { BgUpdater } from "../utils/bg-updater";

type Props = {
  counterStart: number;
  path?: string;
  inventory: InventoryItem[];
};

const getFeedbackText = (hasRedKey: boolean, hasBlueKey: boolean) => {
  if (hasRedKey && hasBlueKey) {
    return "The door is now open!";
  } else {
    return (
      "The door is locked. You need " +
      (hasRedKey ? "" : "a Red key") +
      (!hasRedKey && !hasBlueKey ? " and " : "") +
      (hasBlueKey ? "" : "a Blue key") +
      " to open it."
    );
  }
};

export const ClosedDoor = ({ counterStart, inventory }: Props) => {
  const [displayInfo, setDisplayInfo] = useState(false);
  const hasRedKey = inventory.includes("red-key");
  const hasBlueKey = inventory.includes("blue-key");
  const isOpen = hasRedKey && hasBlueKey;
  const feedbackId = "door-feedback";

  const handleOpeningDoor = () => {
    setDisplayInfo(true);
  };

  useEffect(() => {
    if (!counterStart) route("/");
  }, []);

  return (
    <>
      <BgUpdater color="lightyellow" />
      <TitleUpdater title="Closed Door" />
      <h1>Closed Door</h1>
      <p>
        You're in a brightly lit room. There is a door in front of you. On your
        left, there is a door with a <i>Red</i> handle. On your right, there is
        a door with a <i>Blue</i> handle.
      </p>

      <Link
        role="link"
        href={isOpen ? "/success" : undefined}
        aria-disabled={!isOpen}
        onClick={handleOpeningDoor}
        aria-describedby={displayInfo ? feedbackId : undefined}
      >
        Open Door
      </Link>

      <div aria-live="assertive">
        <p id={feedbackId} hidden={!displayInfo}>
          {getFeedbackText(hasRedKey, hasBlueKey)}
        </p>
      </div>
      <Link href="/red-room">Go to the Red Room</Link>
      <Link href="/blue-room">Go to the Blue Room</Link>
    </>
  );
};
