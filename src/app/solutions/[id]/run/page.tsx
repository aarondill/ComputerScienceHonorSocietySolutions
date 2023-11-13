import { getSolutionFiles } from "@/lib/getSolutions";
import path from "node:path";
import { SolutionCode } from "@/components/Code";
import { ScrollableOutput } from "@/components/ScrollableOutput";
import Loading from "@/components/Loading";
import StreamedOutput from "./Run";

async function Main({ name }: { name: string }) {
  const { code } = await getSolutionFiles(name);
  if (!code) return <div>Could not find code named {name}</div>;
  const codepath = path.relative(path.resolve("public"), code);
  return (
    <>
      <Loading>
        <SolutionCode name={name} filepath={code}></SolutionCode>
      </Loading>
      Output ({path.basename(code)}):
      <ScrollableOutput>
        <Loading>
          <StreamedOutput codepath={codepath} />
        </Loading>
      </ScrollableOutput>
      {/* <CodeScript filepath={code}></CodeScript> */}
      {/* <div> */}
      {/* 	Press ctrl+shift+j to open the console and reload the tab to see the */}
      {/* 	output. */}
      {/* </div> */}
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
