import type { DOMAttributes } from "react";

type Props = {
  height?: string | null;
  dangerouslySetInnerHTML?: DOMAttributes<null>["dangerouslySetInnerHTML"];
  children?: React.ReactNode;
};

export default function ScrollableOutput({
  height,
  dangerouslySetInnerHTML,
  children,
}: Props) {
  if (height === undefined) height = "30vh";
  height ??= undefined;
  return (
    <div
      style={{
        overflowY: "scroll",
        maxHeight: height,
        marginBottom: "1rem",
        outline: "black solid 2px",
      }}>
      <code>
        {dangerouslySetInnerHTML ? (
          <pre
            style={{ display: "inline" }}
            dangerouslySetInnerHTML={dangerouslySetInnerHTML}></pre>
        ) : (
          <pre style={{ display: "inline" }}>{children}</pre>
        )}
      </code>
    </div>
  );
}
export { ScrollableOutput };
