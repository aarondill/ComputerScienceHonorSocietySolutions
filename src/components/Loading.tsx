import type { ReactNode } from "react";
import { Suspense } from "react";

export default function Loading(props: {
  children: ReactNode;
  fallback?: ReactNode;
}) {
  const fallback = props.fallback ?? <div>Loading...</div>;
  return <Suspense fallback={fallback}>{props.children}</Suspense>;
}
export { Loading };
