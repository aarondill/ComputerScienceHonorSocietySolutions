import Link from "next/link";

type Props = { children: React.ReactNode; href: string };
export function DownloadLink({ href, children }: Props) {
  return (
    <Link href={href} download>
      {children}
    </Link>
  );
}
