import Link from "next/link";

export const Footer = () => {
  return (
    <div className="w-full footer bg-gray-950 text-gray-50 p-4 flex flex-col md:flex-row">
      <div>
        <p className="uppercase text-sm md:text-md font-bold">Legal terms</p>
        <div className="flex text-xs gap-3 md:text-sm md:flex-col md:gap-0.5">
          <Link href="#gtu">General term of use</Link>
          <Link href="#pp">Privacy policy</Link>
          <Link href="#n">Notices</Link>
          <Link href="#c">Cookies</Link>
        </div>
      </div>
    </div>
  );
};
