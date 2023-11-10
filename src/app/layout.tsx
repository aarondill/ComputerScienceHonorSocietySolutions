import Navigation from "@/components/Navigation";
import type { Metadata } from "next";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navigation
          routes={{ "/": "Home", "/solutions": "Solutions" }}></Navigation>
        {children}
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
