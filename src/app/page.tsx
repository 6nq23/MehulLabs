import { Hero } from '@/components/sections/Hero';
import { VideoStory } from '@/components/sections/VideoStory';
import { Services } from '@/components/sections/Services';
import { Approach } from '@/components/sections/Approach';
import { Community } from '@/components/sections/Community';
import { Faq } from '@/components/sections/Faq';
import { Contact } from '@/components/sections/Contact';

export default function HomePage() {
  return (
    <>
      <Hero />
      <VideoStory />
      <Services />
      <Approach />
      <Community />
      <Faq />
      <Contact />
    </>
  );
}
