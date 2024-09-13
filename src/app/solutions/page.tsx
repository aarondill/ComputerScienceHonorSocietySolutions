import Loading from "@/components/Loading";
import { getSolutions } from "@/lib/getSolutions";
import type { Metadata } from "next";
import Link from "next/link";
async function SolutionsList() {
  const sols = await getSolutions();
  return (
    <ul>
      {sols.map(({ id, metadata }) => (
        <li key={id}>
          <Link href={`/solutions/${id}`}>
            {metadata.name} - {metadata.createdOn.toLocaleDateString()}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Page() {
  return (
    <>
      <h1>Solutions</h1>
      <Loading>
        <SolutionsList></SolutionsList>
      </Loading>
    </>
  );
}

export const metadata: Metadata = {
  title: "Solutions",
};
