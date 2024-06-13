import { Link } from "preact-router";
import { useEffect, useId, useState } from "preact/hooks";
import { TitleUpdater } from "../utils/title-updater";
import { BgUpdater } from "../utils/bg-updater";

type Props = {
  path?: string;
  onActivate: () => void;
};

export const TheGate = ({ onActivate }: Props) => {
  const id = useId();
  const [isUsingLeftHand, setIsUsingLeftHand] = useState(false);
  const [isUsingRightHand, setIsUsingRightHand] = useState(false);
  const isUsingBothHands = isUsingLeftHand && isUsingRightHand;

  useEffect(() => {
    onActivate();
  }, []);

  return (
    <>
      <BgUpdater color="lightslategray" />
      <TitleUpdater title="The Gate" />
      <h1>The Gate</h1>
      <p>
        You're standing in front of a gate in the middle of nowhere. It's a big,
        iron gate.
      </p>

      <Link
        role="link"
        href={isUsingBothHands ? "/closed-door" : undefined}
        aria-describedby={id}
        aria-disabled={!isUsingBothHands}
      >
        Enter the gate
      </Link>
      <p id={id}>
        {isUsingBothHands &&
          "You can hear the loud creaking of the gate as it opens."}
      </p>

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
