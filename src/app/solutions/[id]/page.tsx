import { PUBLIC_DIR, getSolutionFiles } from "@/lib/getSolutions";
import { SolutionCode } from "@/components/Code";
import path from "path";
import Link from "next/link";
import Image from "next/image";
import Loading from "@/components/Loading";
import { DownloadLink } from "@/components/DownloadLink";

async function Main({ name }: { name: string }) {
  const { video, code, screenshot } = await getSolutionFiles(name);
  const imgURL = screenshot ? `/${path.relative(PUBLIC_DIR, screenshot)}` : "";
  const videoURL = video ? `/${path.relative(PUBLIC_DIR, video)}` : "";
  return (
    <>
      <h4>Code:</h4>
      {code ? (
        <Loading>
          <div>
            <SolutionCode name={name} filepath={code}></SolutionCode>
            <Link href={path.join(name, "run")}>
              Press me to run this code in your browser!
            </Link>
          </div>
        </Loading>
      ) : (
        <div>Could not find code</div>
      )}
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
