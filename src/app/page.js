import Image from "next/image";
import Hero from "@/components/Hero";
import Blog from "@/components/BlogSection/Blog";
import HeaderMenu from "@/components/Header/HeaderMenu";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header1/page";
// import TopCategories from "@/components/OffersAndTrending/TopCategories";
import OffersAndTrending from "@/components/OffersAndTrending/page";
import CardGrid from "@/components/Categories/page";
export default function Home() {
  return (
    <main>
      <Header/>
      <HeaderMenu/>
      <Hero/>
      <CardGrid/>
      <OffersAndTrending/>
      <Blog/>
      <Footer/>
    </main>
  );
}
