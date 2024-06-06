import { BgUpdater } from "../utils/bg-updater";
import { TitleUpdater } from "../utils/title-updater";

export const Success = () => {
  return (
    <>
      <BgUpdater color="lightgreen" />
      <TitleUpdater title="Well done!" />
      <h1>Well done! Confetti all around!</h1>
      <p>You have reached the end of this short game. Wooo hooo!</p>
    </>
  );
};
