import { useRef, useState } from "preact/hooks";
import { TitleUpdater } from "../utils/title-updater";

type Props = {
  hasKey: boolean;
  onGetKey: () => void;
};

export const BlueRoom = ({ hasKey, onGetKey }: Props) => {
  // const getKeyBtnRef = useRef<HTMLButtonElement>(null);
  const [isLocked, setIsLocked] = useState(!hasKey);
  const [displayLockedInfo, setDisplayLockedInfo] = useState(false);
  const firstPortalRef = useRef<HTMLDialogElement>(null);

  const handleGettingTheKey = () => {
    if (isLocked) {
      setDisplayLockedInfo(true);
    } else {
      onGetKey();
    }
  };

  // const handleUnlocking = (event: SubmitEvent) => {
  //   event.preventDefault();
  //   setIsLocked(false);
  //   setDisplayLockedInfo(false);
  //   getKeyBtnRef.current?.focus();
  // };

  const activateFirstPortal = () => {
    firstPortalRef.current?.showModal();
  };

  const closeFirstPortal = () => {
    firstPortalRef.current?.close();
  };

  return (
    <div>
      <TitleUpdater
        title={hasKey ? "Red Room: you have the red key" : "Red Room"}
      />
      <h1>Blue Room</h1>
      <p>
        You are in the blue room. It's all grey but the whole ceiling is
        emitting a blue light. It almost looks like a sky. There is a chest in
        the middle of the room and it's locked. You can see a blue portal on the
        wall.
      </p>

      <button
        type="button"
        aria-disabled={isLocked}
        onClick={handleGettingTheKey}
      >
        Get the key
      </button>

      <button type="button" onClick={activateFirstPortal}>
        Enter the portal
      </button>

      <div aria-live="assertive">
        <p hidden={!displayLockedInfo}>
          You can't get the key because the chest is locked.
        </p>
      </div>

      <dialog ref={firstPortalRef}>
        <h2>First Portal — do you want to open the door?</h2>
        <p>
          You entered the first portal. You're standing on a platform floating
          in the middle of the void. There is a door in front of you.
        </p>
        <button type="button">Yes</button>
        <button type="button" onClick={closeFirstPortal} autoFocus={true}>
          No
        </button>
      </dialog>
    </div>
  );
};
