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
import {BsChevronCompactLeft, BsChevronCompactRight} from 'react-icons/bs';

// Image import
import commando from '../public/commandoVideo.mp4';
import product from '../public/Photos/product.jpg';
import multilayer from '../public/icons/Multilayer.svg';
import water from '../public/icons/Water.svg';
import durable from '../public/icons/Durable.svg';
import shipping from '../public/icons/Shipping.svg';
import box from '../public/icons/Package.svg';
import showcase1 from '../public/Photos/TUCM-PS8.jpg';
import showcase2 from '../public/Photos/TUCM-PS4.jpg';
import showcase3 from '../public/Photos/TUCM-PS6.jpg';
import showcase4 from '../public/Photos/TUCM-PS7.jpg';
import FAQitem from '~/components/FAQitem';

export const meta = () => {
  return [{title: 'Hydrogen | Home'}];
};

export async function loader({params, context, request}) {
  const {collections} = await context.storefront.query(COLLECTIONS_QUERY);

  return json({collections});
}

export default function Homepage() {
  const {collections} = useLoaderData();

  const faqItem1 = {
    header: {img: shipping, title: 'shipping'},
    body: [
      {
        q: 'Do you ship internationally?',
        a: 'Unfortunately not yet :( We want to solidify our operations for now!',
      },
      {
        q: 'What is my delivery cost?',
        a: 'We offer door-to-door delivery at $3.50 for all local orders. You will enjoy free shipping above SGD60 spend!',
      },
      {
        q: 'How long will it take to get my order?',
        a: "We're excited for you to receive your socks too! It will take 4-6 working days to arrive at doorstep the moment you place an order with us :)",
      },
    ],
  };
  const faqItem2 = {
    header: {img: box, title: 'orders'},
    body: [
      {
        q: 'Can I cancel my order?',
        a: 'Please double check your order before checking out as order cancellations or changes are not allowed in order to streamline our operations. As we want our customers to receive their orders as soon as possible, the fulfilment process begins the moment an order is received. It would be difficult for us to cancel your order in time.',
      },
      {
        q: 'Can I return my product?',
        a: "If you change your mind within 14 days of receiving your socks, email us at theuncommonlevel@gmail.com and we're happy to help. Please ensure that the item is in its original condition and packaging in order for the refund to be processed. Shipping costs will be borne by the customer unless in the case of defects.",
      },
      {
        q: 'Can I exchange my product?',
        a: 'Due to logistical reasons, we are unable to provide one to one exchanges for now. We recommend returning your item and placing a new order :)',
      },
      {
        q: 'I received a defective item. Can I get a refund?',
        a: (
          <>
            We're so so sorry if you received a defective piece! In that case,
            please email us at theuncommonlevel@gmail.com within 14 working days
            from date of receipt and we will send you a replacement piece. If
            there are no more stocks, we will issue you a full refund.
            <p className="mt-4">
              Email details: <br /> Your order number: #<br /> The name of the
              defective item: e.g. calf/crew socks <br /> Photograph of the
              defect:
            </p>
          </>
        ),
      },
      {
        q: 'How do I take care of my socks?',
        a: (
          <>
            <span>
              It works like a pair of regular socks but here are some things you
              can take note:
              <ul className="list-disc ps-6 py-2">
                <li>
                  Please DO NOT bleach or iron to prevent the waterproof
                  membrane from being damaged
                </li>
                <li>Drip dry while inverted for fastest drying time.</li>
              </ul>
            </span>
          </>
        ),
      },
    ],
  };

  const slides = [showcase1, showcase2, showcase3, showcase4];
  const [currentIndex, setCurrentIndex] = useState(0);
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div>
      <div className="flex flex-col max-w-[1200px] p-0 mx-auto items-center">
        <video src={commando} className="w-full" autoPlay loop></video>
        <span className="flex justify-center font-inter font-black text-3xl mt-12 md:tracking-[0.2em]">
          ///////////////////////////////
        </span>
        <section className="flex items-center text-center py-0 max-w-[758px] mx-auto">
          <CollectionsGrid collections={collections.edges} />
        </section>
        <span className="flex justify-center font-inter font-black text-3xl mb-12 md:tracking-[0.2em]">
          ///////////////////////////////
        </span>
        <img
          src={product}
          alt=""
          className="my-8 h-[380px] shadow-[0px_0px_60px_10px_rgba(255,255,255,0.15)] object-cover md:h-[90vh]"
        />
        <section className="max-w-[726px] px-0 items-center mx-6 mb-10">
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
        {/* Product Gallery */}
        <section className="justify-center mb-16 mx-6 hidden md:block">
          <div className="md:flex md:flex-row">
            <img
              src={showcase1}
              alt=""
              className="object-cover mb-2 md:me-1 md:w-1/2"
            />
            <img
              src={showcase2}
              alt=""
              className="object-cover mb-2 md:ms-1 md:w-1/2"
            />
          </div>
          <div className="md:flex md:flex-row">
            <img
              src={showcase3}
              alt=""
              className="object-cover mb-2 md:me-1 md:w-1/2"
            />
            <img
              src={showcase4}
              alt=""
              className="object-cover mb-2 md:ms-1 md:w-1/2"
            />
          </div>
        </section>
        {/* Photo Gallery Mobile */}
        <section className="justify-center mb-16 mx-6 md:hidden relative">
          <div className="md:flex md:flex-row">
            <img
              src={slides[currentIndex]}
              alt=""
              className="object-cover mb-2 md:me-1 md:w-1/2"
            />
          </div>
          <div className="absolute top-[40%] left-4 text-2xl px-2 py-4 bg-black/20 text-white cursor-pointer">
            <BsChevronCompactLeft size={30} onClick={prevSlide} />
          </div>
          <div className="absolute top-[40%] right-4 text-2xl px-2 py-4 bg-black/20 text-white cursor-pointer">
            <BsChevronCompactRight size={30} onClick={nextSlide} />
          </div>
        </section>
      </div>
      {/* FAQ */}
      <div className="flex bg-[#2C2C2C] py-14 justify-center">
        <section className="flex flex-col w-full max-w-[1200px] mx-4">
          <h1 className="font-lexend font-bold text-5xl m-0 items-start">
            FAQs
          </h1>
          <FAQitem item={faqItem1} />
          <FAQitem item={faqItem2} />
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
          <div key={index} className="my-12 w-[400px] md:w-full">
            <h1 className="mx-2 my-0 font-lexend font-bold tracking-tighter text-start text-6xl capitalize">
              {collection.node.title}
            </h1>
            <p className="mt-2 mb-4 mx-3 font-inter font-light text-start">
              {collection.node.description}
            </p>
            <ProductsGrid products={collection.node.products.edges} />
            {collection.node.title === 'Men' && (
              <p className="flex mx-3 px-3 py-1 mt-4 font-inter font-light text-start bg-gradient-to-r from-[#262626] border-gray-400 border-l-4 w-fit">
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
    <div className="flex justify-center lg:justify-between">
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
  const comparePrice = product.compareAtPriceRange.minVariantPrice;
  const currentPrice = product.priceRange.minVariantPrice;

  return (
    <Link key={product.id} prefetch="intent" to={variantUrl}>
      <section className="flex flex-col mx-2 p-0 bg-white md:min-h-fit md:flex-row md:w-[370px] transition hover:scale-105 ease-out">
        {product.featuredImage && (
          <Image
            alt={product.featuredImage.altText || product.title}
            aspectRatio="1/1"
            data={product.featuredImage}
            loading={loading}
            width={200}
            className="p-2 object-contain"
          />
        )}
        <div className="flex flex-col pb-2 px-2 justify-between md:pb-16 md:text-start md:justify-end">
          <h4 className="font-lexend font-bold tracking-tighter m-0 text-lg md:text-2xl capitalize">
            {product.title}
          </h4>
          {product.availableForSale === true ? (
            comparePrice.amount === '0.0' ? (
              <span className="font-inter font-light">
                <Money data={currentPrice} />
              </span>
            ) : (
              <>
                <div className="flex flex-row">
                  <span className="font-inter font-light me-2 ms-11 md:ms-0">
                    <Money data={currentPrice} />
                  </span>
                  <sub className="text-[#ff0000] mt-1">Sale</sub>
                </div>
                <s>
                  <Money data={comparePrice} />
                </s>
              </>
            )
          ) : (
            <p className="font-inter font-light text-red-500">Out of stock</p>
          )}
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
             availableForSale
             priceRange {
               minVariantPrice {
                 amount
                 currencyCode
               }
             }
             compareAtPriceRange{
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
