import path from "path";
import { getSolutionFiles } from "../../../../lib/getSolutions";
import { Suspense } from "react";
import { SolutionCode } from "../Code";

export default async function Page({ params }: { params: { id: string } }) {
	const name = params.id;
	const { code } = await getSolutionFiles(name);
	if (!code) return <div>Could not find code named {name}</div>;

	const publicDir = path.resolve("public");
	const src = `/${path.relative(publicDir, code)}`;
	return (
		<>
			<script type="module" src={src}></script>
			{code && (
				<Suspense>
					<SolutionCode name={name} filepath={code}></SolutionCode>
				</Suspense>
			)}
			<div>
				Press ctrl+shift+j to open the console and reload the tab to see the
				output.
			</div>
		</>
	);
}

export function generateMetadata({ params }: { params: { id: string } }) {
	return {
		title: `${params.id} -- Run`,
	};
}
