import Loading from "@/components/Loading";
import Spacing from "@/components/Spacing";
import { getSolutionFiles } from "@/lib/getSolutions";
import path from "path/posix";
import React from "react";
import { Code, Screenshot, Recording, Test } from "./Components";

type Props = { params: { id: string }; searchParams: { [s: string]: string } };
export default function Page({ params }: Props) {
  const { id: name } = params;
  return (
    <>
      <h1>{name}</h1>
      <Loading>
        <Main name={name}></Main>
      </Loading>
    </>
  );
}
async function Main(props: { name: string }) {
  const { name } = props;
  const { code, screenshot, video, test } = await getSolutionFiles(name);
  const testURL = path.join(".", name, "test");
  return (
    <Spacing>
      <Code filepath={code}></Code>
      <Screenshot filepath={screenshot}></Screenshot>
      <Recording filepath={video}></Recording>
      <Test testURL={testURL} filepath={test}></Test>
    </Spacing>
  );
}

export async function generateMetadata({ params }: Props) {
  await Promise.resolve();
  return {
    title: params.id,
  };
}
