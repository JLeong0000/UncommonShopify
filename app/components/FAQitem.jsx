import {useState} from 'react';
import chevron from '../public/icons/Chevron.svg';

export default function FAQitem({item}) {
  const {header, body} = item;
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-between text-black bg-white hover:bg-gray-300 w-full mt-14"
      >
        <div className="flex flex-row items-center">
          <img src={header.img} alt="" className="px-8 h-14 lg:h-20" />
          <h1 className="font-lexend font-medium text-2xl m-0 capitalize">
            {header.title}
          </h1>
        </div>
        {!isOpen ? (
          <img src={chevron} alt="" className="px-8 rotate-180" />
        ) : (
          <img src={chevron} alt="" className="px-8" />
        )}
      </div>
      {isOpen && (
        <div className="mt-6">
          {body.map((faq, index) => {
            return (
              <div key={index}>
                <h3 className="font-inter font-semibold">{faq.q}</h3>
                <p className="font-inter mb-6">{faq.a}</p>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
