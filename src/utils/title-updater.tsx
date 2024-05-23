import { createPortal } from "preact/compat";
import { useEffect, useRef } from "preact/hooks";

type Props = {
  title: string;
};

export const titleUpdaterContainerId = "title-updater-container";

export const TitleUpdater = ({ title }: Props) => {
  const announcerRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    document.title = title;
    announcerRef.current?.focus();
  }, [title]);

  return createPortal(
    <p ref={announcerRef} tabIndex={-1}>
      {title}
    </p>,
    document.getElementById(titleUpdaterContainerId)!,
  );
};
