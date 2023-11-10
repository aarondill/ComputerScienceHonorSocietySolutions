"use client";
import Link from "next/link";
import navigationStyles from "./navigation.module.css";
import { usePathname } from "next/navigation";

export default function Navigation({
	routes,
}: {
	routes: { [href: string]: string };
}) {
	const pathname = usePathname();
	return (
		<nav className={navigationStyles.navigation}>
			<ul>
				{Object.keys(routes).map(href => (
					<li
						key={href}
						className={`${navigationStyles.navigation_item} ${
							href === pathname ? navigationStyles.active : ""
						}`}>
						<Link href={href}>{routes[href]}</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}
