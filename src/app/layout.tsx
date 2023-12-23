import Navigation from "@/components/Navigation";
import type { Metadata } from "next";
import { Providers } from "./providers";

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Navigation
            routes={{ "/": "Home", "/solutions": "Solutions" }}></Navigation>
          {props.children}
        </Providers>
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
