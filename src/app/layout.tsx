import Navigation from "@/components/Navigation";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Navigation
            routes={{ "/": "Home", "/solutions": "Solutions" }}></Navigation>
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
