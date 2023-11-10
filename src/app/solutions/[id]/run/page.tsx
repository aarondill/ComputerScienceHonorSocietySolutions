import { getSolutionFiles } from "@/lib/getSolutions";
import path from "node:path";
import { SolutionCode } from "@/components/Code";
import { spawn } from "child_process";
import { ScrollableOutput } from "@/components/ScrollableOutput";
import Loading from "@/components/Loading";
import type { ChildProcessWithoutNullStreams } from "node:child_process";

async function runTsNode(
	codepath: string
): Promise<
	| { error: string; success: false }
	| { code: number; output: string; success: true }
> {
	if (!codepath) return { error: "No path provided", success: false };
	let res: ChildProcessWithoutNullStreams;
	try {
		res = spawn("ts-node", ["--", codepath], {
			cwd: ".",
			stdio: "pipe",
			timeout: 100 * 1000, // 100 seconds
			windowsHide: true,
		});
	} catch (err) {
		if (typeof err === "object" && err && "message" in err)
			return { error: String(err.message), success: false };
		return { error: String(err), success: false };
	}
	const output: string[] = [];

	res.stdout.on("data", (data: Buffer) => {
		output.push(data.toString("utf8"));
	});
	res.stderr.on("data", (data: Buffer) => {
		output.push(data.toString("utf8"));
	});

	return await new Promise((resolve, reject) => {
		res.on("error", err => {
			reject(err);
		});
		res.on("close", code => {
			resolve({ code: code ?? 0, output: output.join(""), success: true });
		});
	});
}
async function CodeOutput({ path }: { path: string }) {
	const output = await runTsNode(path);
	if (!output.success)
		return <div>Failed to spawn ts-node. Error: {output.error}</div>;
	return (
		<>
			{output.output}
			-- Exited with code {output.code} --
		</>
	);
}

async function Main({ name }: { name: string }) {
	const { code } = await getSolutionFiles(name);
	if (!code) return <div>Could not find code named {name}</div>;

	return (
		<>
			{/* <script defer type="module" src={src}></script> */}
			<Loading>
				<SolutionCode name={name} filepath={code}></SolutionCode>
			</Loading>
			Output ({path.basename(code)}):
			<ScrollableOutput>
				<Loading>
					<CodeOutput path={code}></CodeOutput>
				</Loading>
			</ScrollableOutput>
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
