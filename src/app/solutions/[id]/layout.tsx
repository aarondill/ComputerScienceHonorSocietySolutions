import { solutionExists } from "@/lib/getSolutions";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

export default async function Layout(props: {
  params: { id: string };
  children: ReactNode;
}) {
  const {
    params: { id: name },
    children,
  } = props;
  const exists = await solutionExists(name);
  if (!exists) return notFound();
  return <>{children}</>;
}
