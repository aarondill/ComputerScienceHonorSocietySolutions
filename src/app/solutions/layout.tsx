import Link from "next/link";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<nav>
				<Link href="/solutions">Solutions</Link>
			</nav>
			{children}
		</>
	);
}
