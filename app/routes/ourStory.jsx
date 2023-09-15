import tucmPs4 from '../public/Photos/TUCM-PS4.jpg';
import tucmPs5 from '../public/Photos/TUCM-PS5.jpg';

export default function OurStory() {
  return (
    <>
      <img src={tucmPs4} alt="" />
      <div>
        <h1>Our Story</h1>
        <p>
          The Uncommon Level is a small business founded by ex-commandos in
          2022. The wet and humid terrains, never-ending route marches, and
          back-to-back missions have left us with foot blisters. Our worst
          enemy? Wet socks. Soggy feet are prone to blisters but we could not
          find the perfect waterproof hiking sock. One that is high in comfort,
          breathable, and has great moisture wicking capabilities. One that is
          also perfect for both hot and wet conditions. So we made them. Whether
          you're out in the field, or hiking up a mountain, or even going on a
          camping trip, we help you to be able to focus on your goal and enjoy
          the process without worry of soggy feet and blisters.
        </p>
      </div>
      <img src={tucmPs5} alt="" />
    </>
  );
}
