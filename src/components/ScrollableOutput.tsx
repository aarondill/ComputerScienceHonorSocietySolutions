import type { DOMAttributes } from "react";

type Props = {
  height?: string | null;
  dangerouslySetInnerHTML?: DOMAttributes<null>["dangerouslySetInnerHTML"];
  children?: React.ReactNode;
};

function ScrollableOutput({
  height,
  dangerouslySetInnerHTML,
  children,
}: Props) {
  if (height === undefined) height = "30vh";
  height ??= undefined;
  const props = { style: { display: "inline" } };
  const pre = dangerouslySetInnerHTML ? (
    <pre {...props} dangerouslySetInnerHTML={dangerouslySetInnerHTML}></pre>
  ) : (
    <pre {...props}>{children}</pre>
  );

  return (
    <div
      style={{
        overflowY: "scroll",
        maxHeight: height,
        marginBottom: "1rem",
        outline: "black solid 2px",
      }}>
      <code>{pre}</code>
    </div>
  );
}
export { ScrollableOutput };
export default ScrollableOutput;
