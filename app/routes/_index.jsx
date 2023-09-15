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

// Image import
import tucmPs7 from '../public/Photos/TUCM-PS7.jpg';
import tucmPs2 from '../public/Photos/TUCM-PS2.jpg';

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
    <div className="w-4/6 justify-center p-0">
      <img src={tucmPs7} className="m:w-[1500px}" />
      <CollectionsGrid collections={collections.edges} />
      <h1>/////////////////////////////////////</h1>
      <img src={tucmPs2} alt="" />
      <div>
        <p>icon</p>
        <div>
          <h2>Multi-Layer Technology</h2>
          <p>
            Our three-layered structure prevents water from penetrating inside
            while drawing moisture away from your feet
          </p>
        </div>
        <div>
          <h2>Water Resistant</h2>
          <p>
            Keeps your feet dry and comfortable all day long even in the wettest
            conditions.
          </p>
        </div>
        <div>
          <h2>Durability</h2>
          <p>
            Our Nylon-Polyester blend reinforces the overall durability to
            withstand long marches and hikes.
          </p>
        </div>
      </div>
      <div>
        <h1>FAQs</h1>
        <div>
          <h1 onClick={() => setOpen1((prev) => !prev)}>Shipping</h1>
          {isOpen1 && (
            <div>
              <h3>Do you ship internationally?</h3>
              <p>
                Unfortunately not yet {':('} We want to solidify our operations
                for now!
              </p>
              <h3>What is my delivery cost?</h3>
              <p>
                We offer door-to-door delivery at $3.50 for all local orders.
                You will enjoy free shipping above SGD60 spend!
              </p>
              <h3>How long will it take to get my order?</h3>
              <p>
                We're excited for you to receive your socks too! It will take
                4-6 working days to arrive at doorstep the moment you place an
                order with us {':)'}
              </p>
            </div>
          )}
        </div>
        <div>
          <h1 onClick={() => setOpen2((prev) => !prev)}>Orders</h1>
          {isOpen2 && (
            <div>
              <h3>Can I cancel my order?</h3>
              <p>
                Please double check your order before checking out as order
                cancellations or changes are not allowed in order to streamline
                our operations. As we want our customers to receive their orders
                as soon as possible, the fulfilment process begins the moment an
                order is received. It would be difficult for us to cancel your
                order in time.
              </p>
              <h3>Can I return my product?</h3>
              <p>
                If you change your mind within 14 days of receiving your socks,
                email us at theuncommonlevel@gmail.com and we're happy to help.
                Please ensure that the item is in its original condition and
                packaging in order for the refund to be processed. Shipping
                costs will be borne by the customer unless in the case of
                defects.
              </p>
              <h3>Can I exchange my product?</h3>{' '}
              <p>
                Due to logistical reasons, we are unable to provide one to one
                exchanges for now. We recommend returning your item and placing
                a new order {':)'}
              </p>
              <h3>I received a defective item. Can I get a refund?</h3>{' '}
              <p>
                We're so so sorry if you received a defective piece! In that
                case, please email us at theuncommonlevel@gmail.com within 14
                working days from date of receipt and we will send you a
                replacement piece. If there are no more stocks, we will issue
                you a full refund.{' '}
                <p>
                  Email details:
                  <br />
                  Your order number: #<br />
                  The name of the defective item: e.g. calf/crew socks
                  <br />
                  Photograph of the defect:
                </p>
              </p>
              <h3>How do I take care of my socks?</h3>{' '}
              <p>
                It works like a pair of regular socks but here are some things
                you can take note: Please DO NOT bleach or iron to prevent the
                waterproof membrane from being damaged Drip dry while inverted
                for fastest drying time.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CollectionsGrid({collections}) {
  return (
    <div>
      {collections.map((collection, index) => {
        return (
          <div key={index}>
            <h1>{collection.node.title}</h1>
            <p>{collection.node.description}</p>
            <ProductsGrid products={collection.node.products.edges} />
            {collection.node.title === 'Men' && (
              <p>Free local delivery with a minimum purchase of 3 socks</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

function ProductsGrid({products}) {
  return (
    <div>
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
    <Link
      key={product.id}
      prefetch="intent"
      to={variantUrl}
      className="inline-block"
    >
      {product.featuredImage && (
        <Image
          alt={product.featuredImage.altText || product.title}
          aspectRatio="1/1"
          data={product.featuredImage}
          loading={loading}
          width={200}
        />
      )}
      <h4>{product.title}</h4>
      <small>
        <Money data={product.priceRange.minVariantPrice} />
      </small>
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
