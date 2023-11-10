import Link from "next/link";
import { Suspense } from "react";
import { getSolutions } from "../../lib/getSolutions";
import type { Metadata } from "next";
async function SolutionsList() {
	const sols = await getSolutions();
	return (
		<ul>
			{sols.map(file => (
				<li key={file}>
					<Link href={`/solutions/${file}`}>{file}</Link>
				</li>
			))}
		</ul>
	);
}

export default function Page() {
	return (
		<>
			<h1>Solutions</h1>
			<Suspense fallback={<div>Loading...</div>}>
				<SolutionsList></SolutionsList>
			</Suspense>
		</>
	);
}

export const metadata: Metadata = {
	title: "Solutions",
};
