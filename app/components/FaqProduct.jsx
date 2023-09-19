import {useState} from 'react';
import chevron from '../public/icons/Chevron.svg';

export default function FaqProduct({icon, title, sub}) {
  const [isOpen, setOpen] = useState(false);
  return (
    <div className="my-1">
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="flex justify-between text-black bg-white items-center py-3 hover:bg-gray-300"
      >
        <div className="flex flex-row">
          <img src={icon} alt="" className="px-4" />
          <h1 className="inline-block font-inter font-bold text-[16px] m-0">
            {title}
          </h1>
        </div>
        {!isOpen ? (
          <img src={chevron} alt="" className="px-6 h-5 rotate-180" />
        ) : (
          <img src={chevron} alt="" className="px-6 h-5 " />
        )}
      </div>
      {isOpen && (
        <div className="p-4">
          <p className="font-inter">{sub}</p>
        </div>
      )}
    </div>
  );
}
