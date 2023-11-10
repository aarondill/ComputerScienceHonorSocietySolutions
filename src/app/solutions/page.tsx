import Link from "next/link";
import { getSolutions } from "@/lib/getSolutions";
import type { Metadata } from "next";
import Loading from "@/components/Loading";
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
			<Loading>
				<SolutionsList></SolutionsList>
			</Loading>
		</>
	);
}

export const metadata: Metadata = {
	title: "Solutions",
};
