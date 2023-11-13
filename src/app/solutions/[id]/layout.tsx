import { getSolutions } from "@/lib/getSolutions";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
  children: React.ReactNode;
};
export default async function Layout({ children, params }: Props) {
  const name = params.id;
  const sols = await getSolutions();
  if (!sols.includes(name)) return notFound();

  return <>{children}</>;
}
