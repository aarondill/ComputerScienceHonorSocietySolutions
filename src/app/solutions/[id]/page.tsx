import { getSolutionFiles } from "@/lib/getSolutions";
import { SolutionCode } from "@/components/Code";
import path from "path";
import Link from "next/link";
import Image from "next/image";
import Loading from "@/components/Loading";
import { DownloadLinkFromPath } from "@/components/DownloadLink";
import React from "react";
import Spacing from "@/components/Spacing";
import { getPublicURL } from "@/lib/paths";

function Code(props: { filepath?: string; name: string }) {
  const { filepath, name } = props;
  if (!filepath) return null;
  // HACK: using ./run goes to /solutions/run, so we need to use ./name/run
  const runURL = path.join(".", name, "run");
  return (
    <Loading>
      <DownloadLinkFromPath filepath={filepath}></DownloadLinkFromPath>
      <SolutionCode filepath={filepath}></SolutionCode>
      <Link href={runURL}>Press me to run this code in your browser!</Link>
    </Loading>
  );
}
function Screenshot(props: { filepath?: string }) {
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
function Recording(props: { filepath?: string }) {
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

async function Main({ name }: { name: string }) {
  const { video, code, screenshot } = await getSolutionFiles(name);
  return (
    <Spacing>
      <Code name={name} filepath={code}></Code>
      <Screenshot filepath={screenshot}></Screenshot>
      <Recording filepath={video}></Recording>
    </Spacing>
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

export function generateMetadata({ params }: Props) {
  return {
    title: params.id,
  };
}
