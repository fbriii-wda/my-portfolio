import type { Metadata, Viewport } from "next";
import type { PropsWithChildren } from "react";
import { StarsCanvas } from "@/background/star-background";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import MagneticTargets from "@/components/MagneticTargets";
import SeasonProvider, {
  SEASON_BOOT_SCRIPT,
} from "@/components/SeasonProvider";
import LanguageProvider, {
  LANG_BOOT_SCRIPT,
} from "@/components/LanguageProvider";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Febri Widiane — Software Engineer & Content Creator",
  description:
    "Portofolio imersif Febri Widiane — Software Engineer / Content Creator. Pengalaman web 3D dengan Next.js dan React Three Fiber.",
  authors: [{ name: "Febri Widiane" }],
  openGraph: {
    title: "Febri Widiane — Software Engineer & Content Creator",
    description:
      "Portofolio imersif dengan adegan 3D interaktif. Next.js, React Three Fiber, GLSL.",
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "Febri Widiane — Software Engineer & Content Creator",
    description:
      "Portofolio imersif dengan adegan 3D interaktif. Next.js, React Three Fiber, GLSL.",
  },
};

export const viewport: Viewport = {
  themeColor: "#030014",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Run synchronously before hydration to apply the user's stored
            season + language — avoids a flash of the default values. */}
        <script dangerouslySetInnerHTML={{ __html: SEASON_BOOT_SCRIPT }} />
        <script dangerouslySetInnerHTML={{ __html: LANG_BOOT_SCRIPT }} />
      </head>
      <body
        className="min-h-full flex flex-col"
        suppressHydrationWarning
      >
        <LanguageProvider>
          <SeasonProvider>
            <StarsCanvas />
            <ScrollProgress />
            {children}
            <CustomCursor />
            <MagneticTargets />
          </SeasonProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
