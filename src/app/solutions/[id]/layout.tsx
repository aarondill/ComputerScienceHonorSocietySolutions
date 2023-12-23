import { solutionExists } from "@/lib/getSolutions";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
  children: React.ReactNode;
};
export default async function Layout({ children, params }: Props) {
  const name = params.id;
  const exists = await solutionExists(name);
  if (!exists) return notFound();

  return <>{children}</>;
}
