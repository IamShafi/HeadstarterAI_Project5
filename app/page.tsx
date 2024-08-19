import Image from "next/image";
import Header from "./components/Header";
import Hero from "./components//Hero"

export default function Home() {
  return (
    <main className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
      <Header/>
      <Hero/>
    </main>
  );
}
