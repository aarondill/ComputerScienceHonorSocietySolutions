import Link from "next/link";
import type { ReactNode } from "react";

export function DownloadLink(props: { children: ReactNode; href: string }) {
  const { href, children } = props;
  return (
    <Link href={href} download>
      {children}
    </Link>
  );
}
