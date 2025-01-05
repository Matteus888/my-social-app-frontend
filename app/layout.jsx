import { Quicksand } from "next/font/google";
import "../styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SideNav from "@/components/SideNav";
import ContactsSection from "@/components/ContactsSection";

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
        <Header />
        <SideNav />
        {children}
        <ContactsSection />
        <Footer />
      </body>
    </html>
  );
}
