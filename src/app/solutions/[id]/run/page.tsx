import { PUBLIC_DIR } from "@/lib/constants";
import { getSolutionFiles } from "@/lib/getSolutions";
import path from "node:path";
import { SolutionCode } from "@/components/Code";
import { ScrollableOutput } from "@/components/ScrollableOutput";
import Loading from "@/components/Loading";
import StreamedOutput from "./Run";
import { DownloadLinkFromPath } from "@/components/DownloadLink";

async function Main({ name }: { name: string }) {
  const { code } = await getSolutionFiles(name);
  if (!code) return <div>Could not find code named {name}</div>;
  const codepath = `/${path.relative(PUBLIC_DIR, code)}`;
  return (
    <>
      <Loading>
        <DownloadLinkFromPath filepath={code}></DownloadLinkFromPath>
        <SolutionCode filepath={code}></SolutionCode>
      </Loading>
      Output ({path.basename(code)}):
      <ScrollableOutput height={null}>
        <Loading>
          <StreamedOutput codepath={codepath} />
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
