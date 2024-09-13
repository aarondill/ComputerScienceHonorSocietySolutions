import { CodeWindow } from "@/components/Code";
import { DownloadLinkFromPath } from "@/components/DownloadLink";
import Loading from "@/components/Loading";
import { getPublicURL } from "@/lib/paths";
import Image from "next/image";
import Link from "next/link";
import path from "path/posix";

export function Code(props: { filepath: string | null }) {
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
export function Test(props: TestProps) {
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

export function Screenshot(props: { filepath: string | null }) {
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
export function Recording(props: { filepath: string | null }) {
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
