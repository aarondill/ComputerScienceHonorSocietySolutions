import { getSolutionFiles } from "@/lib/getSolutions";
import path from "node:path";
import { SolutionCode } from "@/components/Code";
import { spawn } from "node:child_process";
import { ScrollableOutput } from "@/components/ScrollableOutput";
import Loading from "@/components/Loading";

async function runNode(
	codepath: string
): Promise<
	| { error: string; success: false }
	| { code: number; output: string; success: true }
> {
	if (!codepath) return { error: "No path provided", success: false };
	const res = spawn("node", ["--", codepath], {
		cwd: ".",
		stdio: "pipe",
		timeout: 100 * 1000, // 100 seconds
		windowsHide: true,
	});
	const output: string[] = [];

	res.stdout.on("data", (data: Buffer) => {
		output.push(data.toString("utf8"));
	});
	res.stderr.on("data", (data: Buffer) => {
		output.push(data.toString("utf8"));
	});

	return await new Promise(resolve => {
		res.on("error", err => {
			resolve({ error: err.message, success: false });
		});
		res.on("close", code => {
			resolve({ code: code ?? 0, output: output.join(""), success: true });
		});
	});
}
async function CodeOutput({ path }: { path: string }) {
	const output = await runNode(path);
	if (!output.success)
		return <div>Something went wrong! Error: {output.error}</div>;
	return (
		<>
			{output.output}
			-- Exited with code {output.code} --
		</>
	);
}
// function CodeScript({ filepath }: { filepath: string }) {
// 	const publicPath = path.resolve("public");
// 	const src = `/${path.relative(publicPath, filepath)}`;
// 	return <script defer type="module" src={src}></script>;
// }

async function Main({ name }: { name: string }) {
	const { code } = await getSolutionFiles(name);
	if (!code) return <div>Could not find code named {name}</div>;
	return (
		<>
			<Loading>
				<SolutionCode name={name} filepath={code}></SolutionCode>
			</Loading>
			Output ({path.basename(code)}):
			<ScrollableOutput>
				<Loading>
					<CodeOutput path={code}></CodeOutput>
				</Loading>
			</ScrollableOutput>
			{/* <CodeScript filepath={code}></CodeScript> */}
			{/* <div> */}
			{/* 	Press ctrl+shift+j to open the console and reload the tab to see the */}
			{/* 	output. */}
			{/* </div> */}
		</>
	);
}

export default function Pages({ params }: { params: { id: string } }) {
	const name = params.id;
	return (
		<Loading>
			<Main name={name}></Main>
		</Loading>
	);
}

export function generateMetadata({ params }: { params: { id: string } }) {
	return {
		title: `${params.id} -- Run`,
	};
}
