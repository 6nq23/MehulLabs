import { Hero } from '@/components/sections/Hero';
import { ScrollStory } from '@/components/sections/ScrollStory';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Products } from '@/components/sections/Products';
import { Projects } from '@/components/sections/Projects';
import { Testimonials } from '@/components/sections/Testimonials';
import { Contact } from '@/components/sections/Contact';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ScrollStory />
      <About />
      <Skills />
      <Products />
      <Projects />
      <Testimonials />
      <Contact />
    </>
  );
}
