import "./app.css";
import Router, { Route } from "preact-router";
import { TheGate } from "./rooms/the-gate";
import { TitleUpdater, titleUpdaterContainerId } from "./utils/title-updater";

export function App() {
  return (
    <>
      <div id={titleUpdaterContainerId} />
      <Router>
        <Route path="/" component={TheGate} />
        <Route
          path="/closed-door"
          component={() => (
            <>
              <TitleUpdater title="Closed Door" />
              <h1>Closed Door</h1>
            </>
          )}
        />
      </Router>
    </>
  );
}
