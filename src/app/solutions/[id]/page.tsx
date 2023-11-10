import { Suspense } from "react";
import { getSolutionFiles, getSolutions } from "../../../lib/getSolutions";
import { SolutionCode } from "./Code";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";

async function Main({ name }: { name: string }) {
	const publicDir = path.resolve("public");
	const { video, code, screenshot } = await getSolutionFiles(name);
	return (
		<>
			<h4>Code:</h4>
			<Suspense>
				{code ? (
					<div>
						<SolutionCode name={name} filepath={code}></SolutionCode>
						<Link href={path.join(name, "run")}>
							Press me to run this code in your browser!
						</Link>
					</div>
				) : (
					<div>Could not find code</div>
				)}
			</Suspense>
			<h4>Screenshot:</h4>
			Here is a screenshot of the code (for meeting requirements):
			{screenshot ? (
				<Image
					src={`/${path.relative(publicDir, screenshot)}`}
					style={{ height: "40vh", display: "block" }}
					alt="A screenshot of the code displayed above"></Image>
			) : (
				<div>No screenshot found</div>
			)}
			<h4>Screen recording:</h4>
			Here is a video of the code running:
			{video ? (
				<video controls style={{ height: "40vh", display: "block" }}>
					<source
						src={`/${path.relative(publicDir, video)}`}
						type="video/mp4"
					/>
				</video>
			) : (
				<div>No video found</div>
			)}
		</>
	);
}

type Props = { params: { id: string }; searchParams: { [s: string]: string } };
export default async function Page({ params }: Props) {
	const name = params.id;
	const sols = await getSolutions();
	if (!sols.includes(name)) return notFound();

	return (
		<>
			<h1>{name}</h1>
			<Main name={name}></Main>
		</>
	);
}

// export async function getStaticPaths() {
// 	const sols = await getSolutions();
// 	return {
// 		paths: sols.map(file => ({
// 			params: {
// 				id: file,
// 			},
// 		})),
// 		fallback: false,
// 	};
// }

export function generateMetadata({ params }: Props) {
	return {
		title: params.id,
	};
}
