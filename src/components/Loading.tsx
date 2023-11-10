import { Suspense } from "react";

type Props = { children: React.ReactNode; fallback?: React.ReactNode };
export default function Loading({ children, fallback }: Props) {
  return (
    <Suspense fallback={fallback ?? <div>Loading...</div>}>{children}</Suspense>
  );
}
export { Loading };
