export default function FunctionIndex({icon, title, sub}) {
  return (
    <div className="mb-2 p-6 border-solid border-gray-400 border-[1px] border-l-8">
      <h2 className="ms-2 font-lexend font-bold uppercase text-3xl mb-2">
        {title}
      </h2>
      <div className="flex flex-row items-center">
        <span className="flex px-4 justify-center">
          <img src={icon} alt="" className="w-10 max-w-[70px]" />
        </span>
        <p className="ps-4 font-inter border-solid border-gray-400 border-l-2">
          {sub}
        </p>
      </div>
    </div>
  );
}
