import { TitleUpdater } from "../utils/title-updater";
import "./intro.css";
import { Link } from "preact-router";

type Props = {
  path?: string;
};

export const Intro = ({}: Props) => {
  return (
    <div className="intro">
      <div className="intro__inner">
        <TitleUpdater title="The Screen Reader Game" />
        <h1>The Screen Reader Game</h1>
        <p>
          Get your screen reader ready!{" "}
          <strong>You won't be able to see anything.</strong>
        </p>
        <p>
          The game can be challenging at times but don't get stressed, take your
          time and <em>enjoy</em> the game.
        </p>
        <Link href="/the-gate">Start the game</Link>
      </div>

      <footer className="intro__footer">
        <p>
          <small>
            Made by <a href="https://mastodon.world/@arturkot">Artur Kot</a>
          </small>
        </p>
      </footer>
    </div>
  );
};
