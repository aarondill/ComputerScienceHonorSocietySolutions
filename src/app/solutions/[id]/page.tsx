import { CodeWindow } from "@/components/Code";
import path from "path/posix";
import Spacing from "@/components/Spacing";
import Link from "next/link";
import Image from "next/image";
import Loading from "@/components/Loading";
import { DownloadLinkFromPath } from "@/components/DownloadLink";
import React from "react";
import { getPublicURL } from "@/lib/paths";
import { getSolutionFiles } from "@/lib/getSolutions";

function Code(props: { filepath: string | null }) {
  const { filepath } = props;
  if (!filepath) return null;
  return (
    <Loading>
      <DownloadLinkFromPath filepath={filepath}></DownloadLinkFromPath>
      <CodeWindow filepath={filepath}></CodeWindow>
    </Loading>
  );
}
type TestProps = { filepath: string | null } & (
  | { testURL: string; showTest?: true }
  | { showTest: false }
);
function Test(props: TestProps) {
  const { filepath, showTest } = props;
  if (!filepath) return null;
  return (
    <Loading>
      <DownloadLinkFromPath filepath={filepath}></DownloadLinkFromPath>
      <CodeWindow filepath={filepath}></CodeWindow>
      {showTest === false ? null : (
        <Link href={props.testURL}>Press me to run the tests!</Link>
      )}
    </Loading>
  );
}

function Screenshot(props: { filepath: string | null }) {
  const { filepath } = props;
  if (!filepath) return null;
  return (
    <>
      <DownloadLinkFromPath filepath={filepath}></DownloadLinkFromPath>
      <div style={{ height: "40vh", display: "block", position: "relative" }}>
        <Image
          src={getPublicURL(filepath)}
          style={{ objectFit: "contain", objectPosition: "left top" }}
          fill
          priority
          quality={20} // lower quality -- faster rendering
          alt="A screenshot of the code"></Image>
      </div>
    </>
  );
}
function Recording(props: { filepath: string | null }) {
  const { filepath } = props;
  if (!filepath) return null;
  const videoType = `video/${path.extname(filepath).slice(1)}`;
  return (
    <>
      <DownloadLinkFromPath filepath={filepath}></DownloadLinkFromPath>
      <video controls style={{ height: "40vh", display: "block" }}>
        <source src={getPublicURL(filepath)} type={videoType} />
      </video>
    </>
  );
}

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
