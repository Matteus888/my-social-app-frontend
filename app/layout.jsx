import "../styles/globals.css";
import ClientProvider from "@/components/ClientProvider";
import { Quicksand } from "next/font/google";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

export const metadata = {
  title: "My Social App",
  description: "Alternative aux réseaux sociaux classiques",
  icons: {
    icon: "/logo.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${quicksand.variable}`}>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
