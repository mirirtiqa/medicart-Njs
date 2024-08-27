import Image from "next/image";
import Hero from "@/components/Hero";
import Blog from "@/components/BlogSection/Blog";
import HeaderMenu from "@/components/Header/HeaderMenu";
import Footer from "@/components/Footer/Footer";
export default function Home() {
  return (
    <main>
      <HeaderMenu/>
      <Hero/>
      <Blog/>
      <Footer/>
    </main>
  );
}
