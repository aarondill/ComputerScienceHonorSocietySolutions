import { getSolutions } from "@/lib/getSolutions";
import { notFound } from "next/navigation";

type Props = { params: { id: string }; searchParams: { [s: string]: string } };
export default async function Layout({
  children,
  params,
}: { children: React.ReactNode } & Props) {
  const name = params.id;
  const sols = await getSolutions();
  if (!sols.includes(name)) return notFound();

  return <>{children}</>;
}
