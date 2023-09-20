import {Fragment, Suspense, useState} from 'react';
import {defer, redirect} from '@shopify/remix-oxygen';
import {Await, Link, useLoaderData} from '@remix-run/react';

import {
  Image,
  Money,
  VariantSelector,
  getSelectedProductOptions,
  CartForm,
} from '@shopify/hydrogen';
import {getVariantUrl} from '~/utils';
import FaqProduct from '~/components/FaqProduct';

export const meta = ({data}) => {
  return [{title: `Hydrogen | ${data.product.title}`}];
};

// image import
import shirt from '../public/icons/shirt.svg';
import cloth from '../public/icons/Cloth.svg';
import truck from '../public/icons/truck.svg';
import heart from '../public/icons/heart.svg';

export async function loader({params, request, context}) {
  const {handle} = params;
  const {storefront} = context;

  const selectedOptions = getSelectedProductOptions(request).filter(
    (option) =>
      // Filter out Shopify predictive search query params
      !option.name.startsWith('_sid') &&
      !option.name.startsWith('_pos') &&
      !option.name.startsWith('_psq') &&
      !option.name.startsWith('_ss') &&
      !option.name.startsWith('_v'),
  );

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  // await the query for the critical product data
  const {product} = await storefront.query(PRODUCT_QUERY, {
    variables: {handle, selectedOptions},
  });

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }

  const firstVariant = product.variants.nodes[0];
  const firstVariantIsDefault = Boolean(
    firstVariant.selectedOptions.find(
      (option) => option.name === 'Title' && option.value === 'Default Title',
    ),
  );

  if (firstVariantIsDefault) {
    product.selectedVariant = firstVariant;
  } else {
    // if no selected variant was returned from the selected options,
    // we redirect to the first variant's url with it's selected options applied
    if (!product.selectedVariant) {
      return redirectToFirstVariant({product, request});
    }
  }

  // In order to show which variants are available in the UI, we need to query
  // all of them. But there might be a *lot*, so instead separate the variants
  // into it's own separate query that is deferred. So there's a brief moment
  // where variant options might show as available when they're not, but after
  // this deffered query resolves, the UI will update.
  const variants = storefront.query(VARIANTS_QUERY, {
    variables: {handle},
  });

  return defer({product, variants});
}

function redirectToFirstVariant({product, request}) {
  const url = new URL(request.url);
  const firstVariant = product.variants.nodes[0];

  throw redirect(
    getVariantUrl({
      pathname: url.pathname,
      handle: product.handle,
      selectedOptions: firstVariant.selectedOptions,
      searchParams: new URLSearchParams(url.search),
    }),
    {
      status: 302,
    },
  );
}

export default function Product() {
  const {product, variants} = useLoaderData();
  const {selectedVariant} = product;
  return (
    <div className="flex flex-col justify-center items-center lg:flex-row lg:items-start">
      <ProductImage image={selectedVariant?.image} />
      <ProductMain
        selectedVariant={selectedVariant}
        product={product}
        variants={variants}
      />
    </div>
  );
}

function ProductImage({image}) {
  if (!image) {
    return <div className="product-image" />;
  }
  return (
    <div className="container justify-center mx-5 max-w-[550px]">
      <Image
        alt={image.altText || 'Product Image'}
        aspectRatio="1/1"
        width="550"
        height="550"
        data={image}
        key={image.id}
        className="object-contain"
      />
    </div>
  );
}

function ProductMain({selectedVariant, product, variants}) {
  const {title, description} = product;
  return (
    <div className="mx-5 items-center md:w-[550px]">
      <h1 className="flex justify-center text-center font-lexend font-normal text-3xl tracking-tight m-0 mt-14 capitalize">
        {title}
      </h1>
      <ProductPrice selectedVariant={selectedVariant} />
      <Suspense
        fallback={
          <ProductForm
            product={product}
            selectedVariant={selectedVariant}
            variants={[]}
          />
        }
      >
        <Await
          errorElement="There was a problem loading product variants"
          resolve={variants}
        >
          {(data) => (
            <ProductForm
              product={product}
              selectedVariant={selectedVariant}
              variants={data.product?.variants.nodes || []}
            />
          )}
        </Await>
      </Suspense>
      <p className="font-inter font-light">{description}</p>
      <section className="w-full my-4">
        <FaqProduct
          icon={shirt}
          title="Size Chart"
          sub={
            <Fragment>
              <table className="border-2 font-inter justify-center text-center">
                <tr>
                  <td className="w-28 p-1 border border-gray-400">
                    Socks Size
                  </td>
                  <td className="w-28 p-1 border border-gray-400">EURO</td>
                  <td className="w-28 p-1 border border-gray-400">US</td>
                </tr>
                <tr>
                  <td className=" w-28 p-1 border border-gray-400 font-extralight">
                    S
                  </td>
                  <td className=" w-28 p-1 border border-gray-400 font-extralight">
                    36-38
                  </td>
                  <td className=" w-28 p-1 border border-gray-400 font-extralight">
                    4-6
                  </td>
                </tr>
                <tr>
                  <td className=" w-28 p-1 border border-gray-400 font-extralight">
                    M
                  </td>
                  <td className=" w-28 p-1 border border-gray-400 font-extralight">
                    39-42
                  </td>
                  <td className=" w-28 p-1 border border-gray-400 font-extralight">
                    6.5-9
                  </td>
                </tr>
                <tr>
                  <td className=" w-28 p-1 border border-gray-400 font-extralight">
                    L
                  </td>
                  <td className=" w-28 p-1 border border-gray-400 font-extralight">
                    43-46
                  </td>
                  <td className=" w-28 p-1 border border-gray-400 font-extralight">
                    9.5-12
                  </td>
                </tr>
              </table>
            </Fragment>
          }
        />
        <FaqProduct
          icon={cloth}
          title="Materials"
          sub={
            <Fragment>
              Inner: 66% coolmax, 30% polyester, 7% elastane <br />
              Middle: Waterproof membrane
              <br />
              Outer: 93% Nylon, 7% Elastane
            </Fragment>
          }
        />
        <FaqProduct
          icon={truck}
          title="Shipping & Returns"
          sub={
            <Fragment>
              Local delivery of $3.50 will take around 4-6 days to reach you the
              moment you placed an order. <br />
              <br />
              Please double check your order before checking out as order
              cancellations or changes are <strong>not allowed</strong> in order
              to streamline our operations. As we want our customers to receive
              their orders as soon as possible, the fulfilment process begins
              the moment an order is received. It would be difficult for us to
              cancel your order in time.
            </Fragment>
          }
        />
        <FaqProduct
          icon={heart}
          title="Care Instructions"
          sub={
            <Fragment>
              <ul className="list-disc px-4">
                <li>Hand wash or machine wash</li>
                <li>Drip dry while inverted for fastest drying time</li>
                <li>
                  <strong>DO NOT</strong> bleach or iron
                </li>
              </ul>
            </Fragment>
          }
        />
      </section>
    </div>
  );
}

function ProductPrice({selectedVariant}) {
  return (
    <div className="flex justify-center font-inter font-light text-lg my-1">
      {selectedVariant?.compareAtPrice ? (
        <>
          <p className="text-[#ff0000] me-2">Sale</p>
          <div className="product-price-on-sale">
            {selectedVariant ? <Money data={selectedVariant.price} /> : null}
            <s>
              <Money data={selectedVariant.compareAtPrice} />
            </s>
          </div>
        </>
      ) : (
        selectedVariant?.price && <Money data={selectedVariant?.price} />
      )}
    </div>
  );
}

function ProductForm({product, selectedVariant, variants}) {
  const [counter, setCounter] = useState(1);
  const increment = () => setCounter(counter + 1);
  let decrement = () => setCounter(counter - 1);
  if (counter <= 0) {
    setCounter(1);
  }
  let quantity = Number(counter);

  return (
    <div className="flex flex-col items-center">
      <VariantSelector
        handle={product.handle}
        options={product.options}
        variants={variants}
      >
        {({option}) => <ProductOptions key={option.name} option={option} />}
      </VariantSelector>
      <h5 className="text-sm my-2 italic">Quantity</h5>
      <div className="flex flex-row items-center border-solid border-white border-[1px] w-max">
        <button onClick={decrement} className="p-2 mx-2">
          -
        </button>
        <p className="mx-20">{counter}</p>
        <button onClick={increment} className="p-2 mx-2">
          +
        </button>
      </div>
      <section className="flex justify-center font-inter text-black bg-white my-14 mx-0 p-3 w-full hover:bg-gray-300">
        <AddToCartButton
          disabled={!selectedVariant || !selectedVariant.availableForSale}
          onClick={() => {
            window.location.href = window.location.href + '#cart-aside';
          }}
          lines={
            selectedVariant
              ? [
                  {
                    merchandiseId: selectedVariant.id,
                    quantity: counter,
                  },
                ]
              : []
          }
        >
          {selectedVariant?.availableForSale ? 'Add to cart' : 'Sold out'}
        </AddToCartButton>
      </section>
    </div>
  );
}

function ProductOptions({option}) {
  return (
    <div className="flex flex-col font-inter font-light" key={option.name}>
      <h5 className="flex text-sm my-2 italic justify-center">{option.name}</h5>
      <div className="flex flex-row flex-wrap space-x-1 space-y-1 justify-center">
        {option.values.map(({value, isAvailable, isActive, to}) => {
          return (
            <Link
              className="flex text-white items-center px-2 mx-1 my-0"
              key={option.name + value}
              prefetch="intent"
              preventScrollReset
              replace
              to={to}
              style={{
                border: isActive ? '1px solid white' : '1px solid transparent',
                opacity: isAvailable ? 1 : 0.3,
              }}
            >
              {value}
            </Link>
          );
        })}
      </div>
      <br />
    </div>
  );
}

function AddToCartButton({analytics, children, disabled, lines, onClick}) {
  return (
    <CartForm route="/cart" inputs={{lines}} action={CartForm.ACTIONS.LinesAdd}>
      {(fetcher) => (
        <div>
          <input
            name="analytics"
            type="hidden"
            value={JSON.stringify(analytics)}
          />
          <button
            type="submit"
            onClick={onClick}
            disabled={disabled ?? fetcher.state !== 'idle'}
          >
            {children}
          </button>
        </div>
      )}
    </CartForm>
  );
}

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
  }
`;

const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    vendor
    handle
    descriptionHtml
    description
    options {
      name
      values
    }
    selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions) {
      ...ProductVariant
    }
    variants(first: 1) {
      nodes {
        ...ProductVariant
      }
    }
    seo {
      description
      title
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
`;

const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
`;

const PRODUCT_VARIANTS_FRAGMENT = `#graphql
  fragment ProductVariants on Product {
    variants(first: 250) {
      nodes {
        ...ProductVariant
      }
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
`;

const VARIANTS_QUERY = `#graphql
  ${PRODUCT_VARIANTS_FRAGMENT}
  query ProductVariants(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...ProductVariants
    }
  }
`;
