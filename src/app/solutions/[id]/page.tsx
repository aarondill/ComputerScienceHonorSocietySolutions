import { getSolutionFiles, getSolutions } from "@/lib/getSolutions";
import { SolutionCode } from "@/components/Code";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import Loading from "@/components/Loading";

async function Main({ name }: { name: string }) {
	const publicDir = path.resolve("public");
	const { video, code, screenshot } = await getSolutionFiles(name);
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
			<h4>Screenshot:</h4>
			Here is a screenshot of the code (for meeting requirements):
			{screenshot ? (
				<div style={{ height: "40vh", display: "block", position: "relative" }}>
					<Image
						src={`/${path.relative(publicDir, screenshot)}`}
						style={{ objectFit: "contain", objectPosition: "left top" }}
						fill
						priority
						quality={20} // lower quality -- faster rendering
						alt="A screenshot of the code displayed above"></Image>
				</div>
			) : (
				<div>No screenshot found</div>
			)}
			<h4>Screen recording:</h4>
			Here is a video of the code running:
			{video ? (
				<video controls style={{ height: "40vh", display: "block" }}>
					<source
						src={`/${path.relative(publicDir, video)}`}
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

export function generateMetadata({ params }: Props) {
	return {
		title: params.id,
	};
}
