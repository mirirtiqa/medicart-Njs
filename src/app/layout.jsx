import { Inter } from "next/font/google";
import "./globals.css";
import Header1 from './components/Header1/page';
import Categories from './components/Categories/page';
import OffersAndTrending from "./components/OffersAndTrending.jsx/page";
const inter = Inter({subsets: ["latin"]});


export const metadata = {
  title: "Medicart",
  description: "Medical store just a click away",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header1 />
        <Categories/>
        <OffersAndTrending/>
        {children}
      </body>
    </html>
  );
}
