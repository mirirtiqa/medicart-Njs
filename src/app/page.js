import Image from "next/image";
import Hero from "./components/Hero";
import Blog from "./components/BlogSection/Blog";
export default function Home() {
  return (
    <main>
      <Hero/>
      <Blog/>
    </main>
  );
}
