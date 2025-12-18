import Link from "next/link";

export const Header = () => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-b-md top-0 sticky ">
      <div className="h-full flex justify-between md:justify-center px-2">
        <Link href="#" className="self-center">
          header
        </Link>
        <div className="self-center text-xl md:hidden">&#10247;</div>
      </div>
    </div>
  );
};
