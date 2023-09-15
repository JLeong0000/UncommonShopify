import {useMatches, NavLink} from '@remix-run/react';

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
    <nav role="navigation">
      <div className="text-white">
        <h3>Contact us</h3>
        <a href="mailto: theuncommonlevel@gmail.com" className="text-white">
          theuncommonlevel@gmail.com
        </a>
      </div>
      <div className="text-white">
        <h3>Social Media</h3>
        <a
          href="https://www.instagram.com/theuncommonlevel/"
          className="text-white"
        >
          insta icon
        </a>
      </div>
    </nav>
  );
}
