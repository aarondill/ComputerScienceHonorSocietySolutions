export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head>
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css"
				/>
			</head>
			<body>{children}</body>
		</html>
	);
}

import type { Metadata } from "next";
export const metadata: Metadata = {
	title: {
		template: "CSHS Solutions: %s",
		default: "CSHS Solutions: Home",
	},
};
