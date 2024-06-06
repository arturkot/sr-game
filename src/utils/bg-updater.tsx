import { createPortal } from "preact/compat";
import { CSSColor } from "../types";

type Props = {
  color: CSSColor;
};

export const BgUpdater = ({ color }: Props) => {
  return createPortal(
    <div class="bg-updater" style={{ backgroundColor: color }} />,
    document.body,
  );
};
