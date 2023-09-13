import {json} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link} from '@remix-run/react';
import {Suspense} from 'react';
import {
  Image,
  Money,
  VariantSelector,
  getSelectedProductOptions,
  CartForm,
} from '@shopify/hydrogen';
import {getVariantUrl} from '~/utils';

export const meta = () => {
  return [{title: 'Hydrogen | Home'}];
};

export async function loader({context, request}) {
  const {collections} = await context.storefront.query(COLLECTIONS_QUERY);

  return json({collections});
}

export default function Homepage() {
  const {collections} = useLoaderData();
  return (
    <>
      <img src="../../public/Photos/TUCM-PS1.jpg" />
      <CollectionsGrid collections={collections.edges} />
      <h1>/////////////////////////////////////</h1>
      <img src="../../public/Photos/TUCM-PS2.jpg" alt="" />
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
    </>
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
  return (
    <Link
      key={product.id}
      prefetch="intent"
      to={product.featuredImage.url}
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
        id
        title
        description
       products(first:2){
         edges{
           node{
             id
             title
             handle
             featuredImage {
               url
             }
             priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
           }
         }
       }
      }
    }
  }
}`;
