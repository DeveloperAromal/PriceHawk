import { About } from "./components/screen/About";
import Contact from "./components/screen/Contact";
import Hero from "./components/screen/Hero";
import { HowItWorks } from "./components/screen/HowItWorks";

export default function Page() {
  return (
    <main>
      <Hero />
      <About />
      <HowItWorks />
      <Contact />
    </main>
  );
}
