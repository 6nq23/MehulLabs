import { Hero } from '@/components/sections/Hero';
import { Leaks } from '@/components/sections/Leaks';
import { Mechanism } from '@/components/sections/Mechanism';
import { Services } from '@/components/sections/Services';
import { Proof } from '@/components/sections/Proof';
import { Approach } from '@/components/sections/Approach';
import { Assurance } from '@/components/sections/Assurance';
import { About } from '@/components/sections/About';
import { Faq } from '@/components/sections/Faq';
import { Contact } from '@/components/sections/Contact';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Leaks />
      <Mechanism />
      <Services />
      <Proof />
      <Approach />
      <Assurance />
      <About />
      <Faq />
      <Contact />
    </>
  );
}
