import {useMatches, NavLink} from '@remix-run/react';

// image import
import insta from '../public/icons/instagram.svg';

export function Footer({menu}) {
  return (
    <footer className="footer">
      <FooterMenu menu={menu} />
    </footer>
  );
}

function FooterMenu() {
  const [root] = useMatches();
  const publicStoreDomain = root?.data?.publicStoreDomain;
  return (
    <nav role="navigation" className="h-[218px] w-full bg-darkGrey pt-2 pb-38">
      <section className="flex flex-wrap max-w-[1080px] mx-auto">
        <div className="flex flex-col ms-6 me-16 mb-6">
          <h3 className="font-inter font-bold mb-1">Contact us</h3>
          <a
            href="mailto: theuncommonlevel@gmail.com"
            className="text-white font-inter"
          >
            theuncommonlevel@gmail.com
          </a>
        </div>
        <div className="flex flex-col mx-16 align-top">
          <h3 className="font-inter font-bold mb-1">Social Media</h3>
          <a href="https://www.instagram.com/theuncommonlevel/">
            <img src={insta} alt="" className="" />
          </a>
        </div>
      </section>
    </nav>
  );
}
