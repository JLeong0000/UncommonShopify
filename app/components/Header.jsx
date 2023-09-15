import {Await, NavLink, useMatches} from '@remix-run/react';
import {Suspense} from 'react';

export function Header({header, isLoggedIn, cart}) {
  const {shop, menu} = header;
  return (
    <header className="bg-red-400 py-6">
      <div className="container flex items-center justify-between px-4 mx-auto">
        <div className="flex space-x-10 font-inter font-medium">
          <NavLink prefetch="intent" to="/" style={activeLinkStyle} end>
            <strong>{shop.name}</strong>
          </NavLink>
          <HeaderMenu menu={menu} />
        </div>
        <HeaderCtas cart={cart} />
      </div>
    </header>
  );
}

export function HeaderMenu({menu, viewport}) {
  const [root] = useMatches();
  const publicStoreDomain = root?.data?.publicStoreDomain;
  const className = `header-menu-${viewport}`;

  return (
    <nav role="navigation">
      <NavLink prefetch="intent" style={activeLinkStyle} to="/ourStory">
        Our Story
      </NavLink>
    </nav>
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
  return <a href="#cart-aside">Cart {count}</a>;
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
