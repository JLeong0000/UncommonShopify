import march from '../public/Photos/TUCM-march.jpg';
import groupkneel from '../public/Photos/TUCM-groupkneelblur.jpg';

export const meta = () => {
  return [{title: 'TheUncommonLevel | Our Story'}];
};

export default function OurStory() {
  return (
    <div className="flex-col max-w-[1200px] items-center mx-auto">
      <img
        src={march}
        alt=""
        className="w-full object-cover max-h-[30vh] md:max-h-[50vh]"
      />
      <section className="text-start p-12 md:p-20">
        <h1 className="font-lexend m-0 tracking-tighter text-6xl lg:text-7xl">
          Our Story
        </h1>
        <div className="font-inter space-y-4 pt-2 mt-8 border-solid border-gray-400 border-t-2">
          <p>
            The Uncommon Level is a small business founded by ex-commandos in
            2022. The wet and humid terrains, never-ending route marches, and
            back-to-back missions have left us with foot blisters.
          </p>
          <p>
            Our worst enemy? Wet socks. Soggy feet are prone to blisters but we
            could not find the perfect waterproof hiking sock. One that is high
            in comfort, breathable, and has great moisture wicking capabilities.
            One that is also perfect for both hot and wet conditions. So we made
            them.
          </p>
          <p>
            Whether you're out in the field, or hiking up a mountain, or even
            going on a camping trip, we help you to be able to focus on your
            goal and enjoy the process without worry of soggy feet and blisters.
          </p>
        </div>
        <div className="mx-32 p-4 mt-14 border-solid border-gray-500 border-b-[1px]">
          <blockquote className="font-lexend text-2xl italic font-semibold">
            "We intend to forge a community of uncommon people with a similar
            mindset. To dream big and conquer their fears."
          </blockquote>
        </div>
      </section>
      <img
        src={groupkneel}
        alt=""
        className="w-full object-cover max-h-[30vh] md:max-h-[50vh]"
      />
    </div>
  );
}
