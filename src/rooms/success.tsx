import "./success.css";
import { useEffect, useMemo } from "preact/hooks";
import { BgUpdater } from "../utils/bg-updater";
import { TitleUpdater } from "../utils/title-updater";
import { route } from "preact-router";

type Props = {
  path?: string;
  counterStart: number;
};

function formatTimestamp(milliseconds: number): string {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  let result = "";

  if (minutes > 0) {
    result += `${minutes} minute${minutes > 1 ? "s" : ""}`;
  }

  if (seconds > 0) {
    if (minutes > 0) {
      result += " and ";
    }
    result += `${seconds} second${seconds > 1 ? "s" : ""}`;
  }

  return result;
}

export const Success = ({ counterStart }: Props) => {
  const completionTime = useMemo(
    () => Date.now() - counterStart,
    [counterStart],
  );

  useEffect(() => {
    if (!counterStart) route("/");
  }, []);

  return (
    <>
      <BgUpdater color="lightgreen" />
      <TitleUpdater title="Well done!" />
      <h1>Well done! Confetti all around!</h1>
      <p>You have reached the end of this short game. Wooo hooo!</p>
      <p className="success">You have completed the game in:</p>
      <p className="success">
        <strong>{formatTimestamp(completionTime)}</strong>.
      </p>
      <p className="success">
        <a href="/" data-native>
          Play again?
        </a>
      </p>
    </>
  );
};
