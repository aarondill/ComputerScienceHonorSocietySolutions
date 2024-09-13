import type { ReactNode } from "react";
import { Children } from "react";

// Spaces each of the children by the given spacing (defaults to 1rem)
// Note: wraps each child to ensure that spacing works as expected
export function Spacing(props: { children: ReactNode; spacing?: string }) {
  const spacing = props.spacing ?? "1rem";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing }}>
      {Children.map(props.children, child => {
        return <div>{child}</div>;
      })}
    </div>
  );
}
