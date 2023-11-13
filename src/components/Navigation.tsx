import Link from "next/link";
import navigationStyles from "./navigation.module.css";

export default function Navigation({
  routes,
}: {
  routes: { [href: string]: string };
}) {
  return (
    <nav className={navigationStyles.navigation}>
      <ul>
        {Object.keys(routes).map(href => (
          <li key={href} className={navigationStyles.navigation_item}>
            <Link href={href}>{routes[href]}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
