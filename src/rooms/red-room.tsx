import { useRef, useState } from "preact/hooks";
import { TitleUpdater } from "../utils/title-updater";
import { Link } from "preact-router";

type Props = {
  hasKey: boolean;
  onGetKey: () => void;
};

export const RedRoom = ({ hasKey, onGetKey }: Props) => {
  const getKeyBtnRef = useRef<HTMLButtonElement>(null);
  const [isLocked, setIsLocked] = useState(!hasKey);
  const [displayLockedInfo, setDisplayLockedInfo] = useState(false);

  const handleGettingTheKey = () => {
    if (isLocked) {
      setDisplayLockedInfo(true);
    } else {
      onGetKey();
    }
  };

  const handleUnlocking = (event: SubmitEvent) => {
    event.preventDefault();
    setIsLocked(false);
    setDisplayLockedInfo(false);
    getKeyBtnRef.current?.focus();
  };

  return (
    <div>
      <TitleUpdater
        title={hasKey ? "Red Room: you have the red key" : "Red Room"}
      />
      <h1>Red Room</h1>
      <p>
        You're in a room with concrete walls. It's tinted red due to the
        lightbulb hanging from the ceiling. There's a glass box in the middle of
        the room. Inside the box, there's a key. You can't reach the key because
        the box is locked.
      </p>

      <button
        ref={getKeyBtnRef}
        type="button"
        aria-disabled={isLocked}
        onClick={handleGettingTheKey}
      >
        Get the key
      </button>

      <Link href="/closed-door">Go back to the room with the closed door</Link>

      <form onSubmit={handleUnlocking}>
        <h2>Unlock the box</h2>
        <label for="activator-switch-1">Activator switch 1</label>
        <input
          required={true}
          type="checkbox"
          id="activator-switch-1"
          onChange={() => setIsLocked(!isLocked)}
          defaultChecked={hasKey}
        />

        <label for="activator-switch-2">Activator switch 2</label>
        <input
          required={true}
          type="checkbox"
          id="activator-switch-2"
          onChange={() => setIsLocked(!isLocked)}
          defaultChecked={hasKey}
        />

        <label for="activator-switch-3">Activator switch 3</label>
        <input
          required={true}
          type="checkbox"
          id="activator-switch-3"
          onChange={() => setIsLocked(!isLocked)}
          defaultChecked={hasKey}
        />

        <label for="activator-switch-4">Activator switch 4</label>
        <input
          required={true}
          type="checkbox"
          id="activator-switch-4"
          onChange={() => setIsLocked(!isLocked)}
          defaultChecked={hasKey}
        />

        <button type="submit">Unlock!</button>
      </form>

      <div aria-live="assertive">
        <p hidden={!displayLockedInfo}>
          You can't get the key because the box is locked.
        </p>
      </div>
    </div>
  );
};
