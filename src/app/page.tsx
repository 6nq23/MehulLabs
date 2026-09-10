import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { Approach } from '@/components/sections/Approach';
import { About } from '@/components/sections/About';
import { Faq } from '@/components/sections/Faq';
import { Contact } from '@/components/sections/Contact';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Approach />
      <About />
      <Faq />
      <Contact />
    </>
  );
}
