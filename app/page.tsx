import { About } from "./components/screen/About";
import Hero from "./components/screen/Hero";
import { HowItWorks } from "./components/screen/HowItWorks";

export default function Page() {
  return (
    <main>
      <Hero />
      <About />
      <HowItWorks />
    </main>
  );
}
