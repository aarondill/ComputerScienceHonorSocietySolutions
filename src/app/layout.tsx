export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
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
