import { PUBLIC_DIR } from "@/lib/constants";
import Link from "next/link";
import path from "node:path";
import type { ReactNode } from "react";

function DownloadLink(props: { children: ReactNode; href: string }) {
  const { href, children } = props;
  return (
    <Link href={href} download>
      {children}
    </Link>
  );
}

// The default basepath is PUBLIC_DIR
export function DownloadLinkFromPath(props: {
  filepath: string;
  basepath?: string;
}) {
  const { filepath, basepath } = props;
  const fileURL = `/${path.relative(basepath ?? PUBLIC_DIR, filepath)}?download`;
  const filename = path.basename(filepath);
  return <DownloadLink href={fileURL}>{filename}:</DownloadLink>;
}
