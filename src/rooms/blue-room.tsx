import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import { TitleUpdater } from "../utils/title-updater";
import { Link, route } from "preact-router";
import { BgUpdater } from "../utils/bg-updater";
import { Fragment } from "preact/jsx-runtime";

type Props = {
  counterStart: number;
  path?: string;
  hasKey: boolean;
  onGetKey: () => void;
};

export const BlueRoom = ({ counterStart, hasKey, onGetKey }: Props) => {
  const getKeyBtnRef = useRef<HTMLButtonElement>(null);
  const [isLocked, setIsLocked] = useState(!hasKey);
  const [displayLockedInfo, setDisplayLockedInfo] = useState(false);
  const feedbackId = "feedback-locked-info";
  const firstPortalRef = useRef<HTMLDialogElement>(null);
  const secondPortalRef = useRef<HTMLDialogElement>(null);
  const thirdPortalRef = useRef<HTMLDialogElement>(null);
  const firstNumber = useMemo(() => Math.floor(Math.random() * 10), []);
  const secondNumber = useMemo(() => Math.floor(Math.random() * 10), []);
  const answers = useMemo(
    () =>
      Array.from(
        new Set([
          firstNumber + secondNumber,
          firstNumber - secondNumber,
          firstNumber * secondNumber,
          firstNumber / secondNumber,
        ]),
      ).sort(() => Math.random() - 0.5),
    [firstNumber, secondNumber],
  );
  const [isWrongAnswer, setIsWrongAnswer] = useState(false);

  useEffect(() => {
    if (!counterStart) route("/");
  }, []);

  const handleGettingTheKey = () => {
    if (isLocked) {
      setDisplayLockedInfo(true);
    } else {
      onGetKey();
    }
  };

  const handleUnlocking = () => {
    setIsLocked(false);
    setDisplayLockedInfo(false);
    getKeyBtnRef.current?.focus();
  };

  const activateFirstPortal = () => {
    firstPortalRef.current?.showModal();
  };

  const closeFirstPortal = () => {
    firstPortalRef.current?.close();
  };

  const activateSecondPortal = () => {
    firstPortalRef.current?.close();
    secondPortalRef.current?.showModal();
  };

  const closeSecondPortal = () => {
    secondPortalRef.current?.close();
  };

  const activateThirdPortal = () => {
    secondPortalRef.current?.close();
    thirdPortalRef.current?.showModal();
  };

  const closeThirdPortal = () => {
    thirdPortalRef.current?.close();
  };

  const handlePuzzle = (event: SubmitEvent) => {
    event.preventDefault();

    if (event.target instanceof HTMLFormElement) {
      const answers = event.target.elements.namedItem("answer");

      if (answers instanceof RadioNodeList) {
        const selectedAnswer = answers.value;

        if (parseInt(selectedAnswer, 10) === firstNumber + secondNumber) {
          setIsLocked(false);
          setDisplayLockedInfo(false);
          setIsWrongAnswer(false);
          closeThirdPortal();
          handleUnlocking();
        } else {
          setIsWrongAnswer(true);
        }
      }
    }
  };

  return (
    <div>
      <BgUpdater color="lightblue" />
      <TitleUpdater
        title={hasKey ? "Blue Room: you have the blue key" : "Blue Room"}
      />
      <Link href="/closed-door">Go back to the room with the closed door</Link>
      <h1>Blue Room</h1>
      <p>
        You are in the blue room. It's all grey but the whole ceiling is
        emitting a blue light. It almost looks like a sky. There is a chest in
        the middle of the room and it's locked. You can see a blue portal on the
        wall.
      </p>

      <button
        ref={getKeyBtnRef}
        type="button"
        aria-disabled={isLocked}
        aria-describedby={displayLockedInfo ? feedbackId : undefined}
        onClick={handleGettingTheKey}
      >
        Get the key
      </button>

      <button type="button" onClick={activateFirstPortal}>
        Enter the portal
      </button>

      <div aria-live="assertive">
        <p id={feedbackId} hidden={!displayLockedInfo}>
          You can't get the key because the chest is locked.
        </p>
      </div>

      <dialog ref={firstPortalRef}>
        <h1>First Portal — do you want to open the door?</h1>
        <p>
          You entered the first portal. You're standing on a platform floating
          in the middle of the void. There is a door in front of you.
        </p>
        <button type="button" onClick={activateSecondPortal}>
          Yes
        </button>
        <button type="button" onClick={closeFirstPortal} autoFocus={true}>
          No
        </button>
      </dialog>

      <dialog ref={secondPortalRef}>
        <h1>Second Portal but with three doors!</h1>
        <p>
          Open the <strong>second</strong> door.
        </p>
        <button type="button" onClick={closeSecondPortal}>
          First door
        </button>
        <button type="button" onClick={activateThirdPortal}>
          Second door
        </button>
        <button type="button" onClick={closeSecondPortal}>
          Third door
        </button>
      </dialog>

      <dialog ref={thirdPortalRef}>
        <h1>Third Portal! Oh but the door is locked!</h1>

        <form onSubmit={handlePuzzle}>
          <h2>Unlock the door</h2>
          <fieldset>
            <legend for="third-portal-puzzle">
              {`What's the sum of ${firstNumber} and ${secondNumber}?`}
            </legend>
            {answers.map((answer) => (
              <Fragment key={answer}>
                <label>
                  It's {answer}
                  <input
                    type="radio"
                    name="answer"
                    value={answer}
                    required={true}
                    onChange={() => setIsWrongAnswer(false)}
                  />
                </label>
              </Fragment>
            ))}
            {isWrongAnswer && <p role="alert">Wrong answer! Try again.</p>}
          </fieldset>

          <button type="submit">Enter the door</button>
        </form>

        <button type="button" onClick={closeThirdPortal} autoFocus={true}>
          Go back
        </button>
      </dialog>
    </div>
  );
};
