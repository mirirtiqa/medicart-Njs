import { Saira } from "next/font/google";
import "./globals.css";
import StyledComponentsRegistry from '@/lib/registry'

// const inter = Inter({ subsets: ["latin"] });
const saira = Saira(
  {
    subsets: ["latin"] 
  }
);

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <body className={saira.className}>
      <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
