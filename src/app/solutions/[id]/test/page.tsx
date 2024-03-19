import { getSolutionFiles } from "@/lib/getSolutions";
import path from "node:path";
import { ScrollableOutput } from "@/components/ScrollableOutput";
import Loading from "@/components/Loading";
import StreamedOutput from "./Run";
import { getPublicPath } from "@/lib/paths";
import { Test } from "../Components";
import Link from "next/link";

async function Main({ name }: { name: string }) {
  const { test } = await getSolutionFiles(name);
  if (!test) return <div>Error: could not find test named {name}</div>;
  return (
    <>
      <h1>
        <Link href=".">{name}</Link>
      </h1>
      <Test showTest={false} filepath={test}></Test>
      <div>Output ({path.basename(test)}):</div>
      <ScrollableOutput height={null}>
        <Loading>
          <StreamedOutput codepath={getPublicPath(test)} />
        </Loading>
      </ScrollableOutput>
    </>
  );
}

export default function Pages({ params }: { params: { id: string } }) {
  const name = params.id;

  return (
    <Loading>
      <Main name={name}></Main>
    </Loading>
  );
}

export function generateMetadata({ params }: { params: { id: string } }) {
  return {
    title: `${params.id} -- Run`,
  };
}
