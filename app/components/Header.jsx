import {Await, NavLink, useMatches} from '@remix-run/react';
import {Suspense} from 'react';

// image import
import cart from '../public/icons/Cart.svg';

export function Header({header, isLoggedIn, cart}) {
  const {shop, menu} = header;
  return (
    <header className="bg-[rgba(19,19,19,0.7)] py-6 sticky top-0">
      <div className="flex items-center justify-between px-4 mx-auto max-w-[1080px]">
        <div className="flex space-x-10">
          <NavLink prefetch="intent" to="/" style={activeLinkStyle} end>
            <strong className="text-white font-bebas uppercase">
              {shop.name}
            </strong>
          </NavLink>
          <NavLink prefetch="intent" style={activeLinkStyle} to="/ourStory">
            <span className="text-white font-inter font-medium">Our Story</span>
          </NavLink>
        </div>
        <HeaderCtas cart={cart} />
      </div>
    </header>
  );
}

function HeaderCtas({cart}) {
  return (
    <nav role="navigation">
      <CartToggle cart={cart} />
    </nav>
  );
}

function CartBadge({count}) {
  return (
    <a href="#cart-aside" className="text-white flex flex-row mx-2">
      <img src={cart} alt="cart" />
      <sub>{count}</sub>
    </a>
  );
}

function CartToggle({cart}) {
  return (
    <Suspense fallback={<CartBadge count={0} />}>
      <Await resolve={cart}>
        {(cart) => {
          if (!cart) return <CartBadge count={0} />;
          return <CartBadge count={cart.totalQuantity || 0} />;
        }}
      </Await>
    </Suspense>
  );
}

function activeLinkStyle({isActive, isPending}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'black',
  };
}
