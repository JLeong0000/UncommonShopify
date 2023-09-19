export default function FunctionIndex({icon, title, sub}) {
  return (
    <div className="flex h-[200px] p-0 my-1">
      <span className="flex w-auto px-6 h-[200px] items-center bg-[#2c2c2c] border-solid border-gray-400 border-[1px]">
        <img src={icon} alt="" className="max-w-[35px]" />
      </span>
      <div className="w-auto my-auto px-6">
        <h2 className="font-bebasneue font-normal text-2xl tracking-wider">
          {title}
        </h2>
        <p className="font-inter">{sub}</p>
      </div>
    </div>
  );
}
