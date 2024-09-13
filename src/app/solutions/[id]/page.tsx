import Loading from "@/components/Loading";
import { Spacing } from "@/components/Spacing";
import { getSolutionFiles, getSolutionMetadata } from "@/lib/getSolutions";
import path from "path/posix";
import { Code, Recording, Screenshot, Test } from "./Components";

type Props = { params: { id: string }; searchParams: { [s: string]: string } };
export default function Page({ params }: Props) {
  return (
    <>
      <Loading>
        <Main {...params}></Main>
      </Loading>
    </>
  );
}
async function Main(props: { id: string }) {
  const [{ code, screenshot, video, test }, metadata] = await Promise.all([
    getSolutionFiles(props.id),
    getSolutionMetadata(props.id),
  ]);
  const testURL = path.join(".", props.id, "test");
  return (
    <Spacing>
      <div>
        <h1 style={{ marginBottom: 0, textDecoration: "underline" }}>
          {metadata.name} - {metadata.createdOn.toLocaleDateString()}
        </h1>
        {metadata.description}
      </div>
      <hr />
      <Code filepath={code}></Code>
      <Screenshot filepath={screenshot}></Screenshot>
      <Recording filepath={video}></Recording>
      <Test testURL={testURL} filepath={test}></Test>
    </Spacing>
  );
}

export async function generateMetadata({ params }: Props) {
  await Promise.resolve();
  return { title: params.id };
}
