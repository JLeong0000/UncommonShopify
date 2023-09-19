import {json} from '@shopify/remix-oxygen';
import {useLoaderData, Link} from '@remix-run/react';
import {
  Image,
  Money,
  VariantSelector,
  getSelectedProductOptions,
  CartForm,
} from '@shopify/hydrogen';
import {useVariantUrl} from '~/utils';
import {useState} from 'react';
import FunctionIndex from '~/components/FunctionIndex';

// Image import
import tucmPs7 from '../public/Photos/TUCM-PS7.jpg';
import tucmPs2 from '../public/Photos/TUCM-PS2.jpg';
import multilayer from '../public/icons/Multilayer.svg';
import water from '../public/icons/Water.svg';
import durable from '../public/icons/Durable.svg';
import shipping from '../public/icons/Shipping.svg';
import box from '../public/icons/Package.svg';
import chevron from '../public/icons/Chevron.svg';

export const meta = () => {
  return [{title: 'Hydrogen | Home'}];
};

export async function loader({context, request}) {
  const {collections} = await context.storefront.query(COLLECTIONS_QUERY);

  return json({collections});
}

export default function Homepage() {
  const {collections} = useLoaderData();
  const [isOpen1, setOpen1] = useState(false);
  const [isOpen2, setOpen2] = useState(false);
  return (
    <div>
      <div className="max-w-[1200px] flex-col p-0 mx-auto items-center">
        <img src={tucmPs7} className="w-full h-[400px] object-cover" />
        <section className="flex items-center text-center py-8 max-w-[758px] mx-auto">
          <CollectionsGrid collections={collections.edges} />
        </section>
        <span className="font-inter font-black text-3xl tracking-widest text-center block">
          //////////////////////////////////////////////
        </span>
        <img
          src={tucmPs2}
          alt=""
          className="w-full my-16 shadow-[0px_0px_60px_10px_rgba(255,255,255,0.15)]"
        />
        <section className="max-w-[726px] py-8 px-0 items-center mx-auto mb-20">
          <FunctionIndex
            icon={multilayer}
            title="Multi-Layer Technology"
            sub="Our three-layered structure prevents water from penetrating
                inside while drawing moisture away from your feet"
          />
          <FunctionIndex
            icon={water}
            title="Water Resistant"
            sub="Keeps your feet dry and comfortable all day long even in the
                wettest conditions."
          />
          <FunctionIndex
            icon={durable}
            title="Durability"
            sub="Our Nylon-Polyester blend reinforces the overall durability to
                withstand long marches and hikes."
          />
        </section>
      </div>
      <div className="bg-[#2C2C2C] py-14">
        <section className="max-w-[1200px] mx-auto">
          <h1 className="font-inter font-bold text-4xl m-0">FAQs</h1>
          <div className="w-full my-14">
            <div
              onClick={() => setOpen1((prev) => !prev)}
              className="flex justify-between text-black bg-white items-center hover:bg-gray-300"
            >
              <div className="flex flex-row items-center">
                <img src={shipping} alt="" className="px-8 h-20" />
                <h1 className="font-inter font-medium text-2xl m-0 px-4">
                  Shipping
                </h1>
              </div>
              {!isOpen1 ? (
                <img src={chevron} alt="" className="px-8 rotate-180" />
              ) : (
                <img src={chevron} alt="" className="px-8" />
              )}
            </div>
            {isOpen1 && (
              <div className="mt-6">
                <h3 className="font-inter font-semibold">
                  Do you ship internationally?
                </h3>
                <p className="font-inter mb-6">
                  Unfortunately not yet {':('} We want to solidify our
                  operations for now!
                </p>
                <h3 className="font-inter font-semibold">
                  What is my delivery cost?
                </h3>
                <p className="font-inter mb-6">
                  We offer door-to-door delivery at $3.50 for all local orders.
                  You will enjoy free shipping above SGD60 spend!
                </p>
                <h3 className="font-inter font-semibold">
                  How long will it take to get my order?
                </h3>
                <p className="font-inter mb-6">
                  We're excited for you to receive your socks too! It will take
                  4-6 working days to arrive at doorstep the moment you place an
                  order with us {':)'}
                </p>
              </div>
            )}
          </div>
          <div>
            <div
              onClick={() => setOpen2((prev) => !prev)}
              className="flex justify-between text-black bg-white items-center hover:bg-gray-300"
            >
              <div className="flex flex-row items-center">
                <img src={box} alt="" className="px-8 h-20" />
                <h1 className="font-inter font-medium text-2xl m-0 px-4">
                  Orders
                </h1>
              </div>
              {!isOpen2 ? (
                <img src={chevron} alt="" className="px-8 rotate-180" />
              ) : (
                <img src={chevron} alt="" className="px-8" />
              )}
            </div>
            {isOpen2 && (
              <div className="mt-6">
                <h3 className="font-inter font-semibold">
                  Can I cancel my order?
                </h3>
                <p className="font-inter mb-6">
                  Please double check your order before checking out as order
                  cancellations or changes are not allowed in order to
                  streamline our operations. As we want our customers to receive
                  their orders as soon as possible, the fulfilment process
                  begins the moment an order is received. It would be difficult
                  for us to cancel your order in time.
                </p>
                <h3 className="font-inter font-semibold">
                  Can I return my product?
                </h3>
                <p className="font-inter mb-6">
                  If you change your mind within 14 days of receiving your
                  socks, email us at theuncommonlevel@gmail.com and we're happy
                  to help. Please ensure that the item is in its original
                  condition and packaging in order for the refund to be
                  processed. Shipping costs will be borne by the customer unless
                  in the case of defects.
                </p>
                <h3 className="font-inter font-semibold">
                  Can I exchange my product?
                </h3>
                <p className="font-inter mb-6">
                  Due to logistical reasons, we are unable to provide one to one
                  exchanges for now. We recommend returning your item and
                  placing a new order {':)'}
                </p>
                <h3 className="font-inter font-semibold">
                  I received a defective item. Can I get a refund?
                </h3>
                <p className="font-inter mb-6">
                  We're so so sorry if you received a defective piece! In that
                  case, please email us at theuncommonlevel@gmail.com within 14
                  working days from date of receipt and we will send you a
                  replacement piece. If there are no more stocks, we will issue
                  you a full refund.
                  <p className="mt-4">
                    Email details:
                    <br />
                    Your order number: #<br />
                    The name of the defective item: e.g. calf/crew socks
                    <br />
                    Photograph of the defect:
                  </p>
                </p>
                <h3 className="font-inter font-semibold">
                  How do I take care of my socks?
                </h3>
                <p className="font-inter mb-6">
                  It works like a pair of regular socks but here are some things
                  you can take note:
                  <ul className="list-disc ps-6 py-2">
                    <li>
                      Please DO NOT bleach or iron to prevent the waterproof
                      membrane from being damaged
                    </li>
                    <li>Drip dry while inverted for fastest drying time.</li>
                  </ul>
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function CollectionsGrid({collections}) {
  return (
    <div>
      {collections.map((collection, index) => {
        return (
          <div key={index} className="my-10">
            <h1 className="my-2 font-inter font-bold text-2xl">
              {collection.node.title}
            </h1>
            <p className="mb-8 font-inter font-light">
              {collection.node.description}
            </p>
            <ProductsGrid products={collection.node.products.edges} />
            {collection.node.title === 'Men' && (
              <p className="flex mx-auto px-8 mt-6 font-inter font-light bg-black border-gray-400 border-[1px] rounded-md w-fit">
                Free local delivery with a minimum purchase of 3 socks
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

function ProductsGrid({products}) {
  return (
    <div className="flex justify-between">
      {products.map((product, index) => {
        return (
          <ProductItem
            product={product.node}
            loading={index < 4 ? 'eager' : undefined}
            key={product.node.id}
          />
        );
      })}
    </div>
  );
}

function ProductItem({product, loading}) {
  const variant = product.variants.nodes[0];
  const variantUrl = useVariantUrl(product.handle, variant.selectedOptions);
  return (
    <Link key={product.id} prefetch="intent" to={variantUrl}>
      <section className="flex p-0 w-[370px] bg-white">
        {product.featuredImage && (
          <Image
            alt={product.featuredImage.altText || product.title}
            aspectRatio="1/1"
            data={product.featuredImage}
            loading={loading}
            width={200}
            className="p-2"
          />
        )}
        <div className="flex flex-col text-start px-2 justify-end pb-[70px]">
          <h4 className="font-bebasneue text-4xl m-0">{product.title}</h4>
          <small className="font-inter font-light text-xl">
            <Money data={product.priceRange.minVariantPrice} />
          </small>
        </div>
      </section>
    </Link>
  );
}

const COLLECTIONS_QUERY = `#graphql
{
  collections(first:2) {
    edges {
      node {
        title
        id
        description
       products(first:2){
         edges{
           node{
             id
             title
             handle
             priceRange {
               minVariantPrice {
                 amount
                 currencyCode
               }
             }
             featuredImage {
               url
               altText
             }
             variants(first: 1){
               nodes{
                 selectedOptions{
                   name
                   value
                 }
               }
             }
           }
         }
       }
      }
    }
  }
 }`;
