import { useState } from "preact/hooks";
import { TitleUpdater } from "../utils/title-updater";
import { Link } from "preact-router";

export const ClosedDoor = () => {
  const [displayInfo, setDisplayInfo] = useState(false);

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
      <button type="button" onClick={handleOpeningDoor}>
        Open Door
      </button>
      <div aria-live="assertive">
        <p hidden={!displayInfo}>
          The door is locked. You need a <i>Blue</i> and a <i>Red</i> key to
          open it.
        </p>
      </div>
      <Link href="/red-room">Go to the Red Room</Link>
      <Link href="/blue-room">Go to the Blue Room</Link>
    </>
  );
};
