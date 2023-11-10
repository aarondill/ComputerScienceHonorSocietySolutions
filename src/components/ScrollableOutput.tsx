import type { DOMAttributes } from "react";

type Props = {
	height?: string;
	dangerouslySetInnerHTML?: DOMAttributes<null>["dangerouslySetInnerHTML"];
	children?: React.ReactNode;
};

export default function ScrollableOutput({
	height,
	dangerouslySetInnerHTML,
	children,
}: Props) {
	return (
		<div
			style={{
				overflowY: "scroll",
				maxHeight: height ?? "30vh",
				marginBottom: "1rem",
				outline: "black solid 2px",
			}}>
			<code>
				{dangerouslySetInnerHTML ? (
					<pre
						style={{ display: "inline" }}
						dangerouslySetInnerHTML={dangerouslySetInnerHTML}></pre>
				) : (
					<pre style={{ display: "inline" }}>{children}</pre>
				)}
			</code>
		</div>
	);
}
export { ScrollableOutput };
