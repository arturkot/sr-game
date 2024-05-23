import { Link } from "preact-router";
import { createPortal } from "preact/compat";
import { useId, useState } from "preact/hooks";
import { TitleUpdater } from "../utils/title-updater";

export const TheGate = () => {
  const id = useId();
  const [isUsingLeftHand, setIsUsingLeftHand] = useState(false);
  const [isUsingRightHand, setIsUsingRightHand] = useState(false);
  const isUsingBothHands = isUsingLeftHand && isUsingRightHand;

  return (
    <>
      <TitleUpdater title="The Gate" />
      <h1>The Gate</h1>
      <p>
        You're standing in front of a gate in the middle of nowhere. It's a big,
        iron gate.
      </p>
      {isUsingBothHands ? (
        <>
          <Link href="/closed-door" aria-describedby={id}>
            Enter the gate
          </Link>
          {createPortal(
            <p id={id}>
              You can hear the loud creaking of the gate as it opens.
            </p>,
            document.body,
          )}
        </>
      ) : (
        <a role="link" aria-disabled="true">
          Enter the gate
        </a>
      )}

      <button
        type="button"
        onClick={() => setIsUsingLeftHand(true)}
        aria-pressed={isUsingLeftHand}
      >
        Press your left hand against the gate
      </button>
      <button
        type="button"
        onClick={() => setIsUsingRightHand(true)}
        aria-pressed={isUsingRightHand}
      >
        Press your right hand firmly against the gate
      </button>
    </>
  );
};
