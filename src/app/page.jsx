import Image from "next/image";
import Hero from "@/components/Hero";
import Blog from "@/components/BlogSection/Blog";
import HeaderMenu from "@/components/Header/HeaderMenu";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header1/page";
// import TopCategories from "@/components/OffersAndTrending/TopCategories";
import OffersAndTrending from "@/components/OffersAndTrending/page";
import CardGrid from "@/components/Categories/page";
import MUIHeaderMenu from "@/components/Header/MUIHeaderMenu";
import MUIHero from "@/components/MUIHero";
export default function Home() {
  return (
    <main>
      
      <Header/>
      <MUIHeaderMenu/>
      <MUIHero/>
      {/* <Hero/> */}
      <CardGrid/>
      <OffersAndTrending/>
      <Blog/>
      <Footer/>
    </main>
  );
}
