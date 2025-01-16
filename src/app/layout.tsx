import Navigation from "@/components/Navigation";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";

export default function RootLayout(props: { children: React.ReactNode }) {
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL;
  if (!githubUrl) throw new Error("NEXT_PUBLIC_GITHUB_URL is not defined");
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Navigation
            routes={{
              "/": "Home",
              "/solutions": "Solutions",
              [githubUrl]: "Github",
            }}></Navigation>
          {props.children}
        </ThemeProvider>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: {
    template: "CSHS Solutions: %s",
    default: "CSHS Solutions: Home",
  },
};
