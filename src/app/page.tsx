import Link from "next/link";
export default function Page() {
  return (
    <>
      <p>
        This is my website for the Computer Science Honor Society&apos;s coding
        challenges.
      </p>
      Go here for the solutions: <Link href="/solutions">/solutions</Link>
    </>
  );
}
