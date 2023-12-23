import { PUBLIC_DIR, getSolutionFiles } from "@/lib/getSolutions";
import { SolutionCode } from "@/components/Code";
import path from "path";
import Link from "next/link";
import Image from "next/image";
import Loading from "@/components/Loading";
import { DownloadLink } from "@/components/DownloadLink";

function Code(props: { filepath?: string; name: string }) {
  const { filepath } = props;
  if (!filepath) return "Could not find code";
  const fileURL = `/${path.relative(PUBLIC_DIR, filepath)}`;
  const filename = path.basename(filepath);
  const runURL = path.join(path.basename(location.pathname), "run");
  return (
    <Loading>
      <DownloadLink href={fileURL}>{filename}:</DownloadLink>
      <SolutionCode filepath={filepath}></SolutionCode>
      <Link href={runURL}>Press me to run this code in your browser!</Link>
    </Loading>
  );
}

async function Main({ name }: { name: string }) {
  const { video, code, screenshot } = await getSolutionFiles(name);
  const imgURL = screenshot ? `/${path.relative(PUBLIC_DIR, screenshot)}` : "";
  const videoURL = video ? `/${path.relative(PUBLIC_DIR, video)}` : "";
  return (
    <>
      <Code name={name} filepath={code}></Code>
      <DownloadLink href={imgURL}>
        <h4>Screenshot:</h4>
      </DownloadLink>
      Here is a screenshot of the code (for meeting requirements):
      {screenshot ? (
        <div style={{ height: "40vh", display: "block", position: "relative" }}>
          <Image
            src={imgURL}
            style={{ objectFit: "contain", objectPosition: "left top" }}
            fill
            priority
            quality={20} // lower quality -- faster rendering
            alt="A screenshot of the code displayed above"></Image>
        </div>
      ) : (
        <div>No screenshot found</div>
      )}
      <DownloadLink href={videoURL}>
        <h4>Screen recording:</h4>
      </DownloadLink>
      Here is a video of the code running:
      {video ? (
        <video controls style={{ height: "40vh", display: "block" }}>
          <source
            src={videoURL}
            type={`video/${path.extname(video).slice(1)}`}
          />
        </video>
      ) : (
        <div>No video found</div>
      )}
    </>
  );
}

type Props = { params: { id: string }; searchParams: { [s: string]: string } };
export default function Page({ params }: Props) {
  const name = params.id;
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
