import Image from "next/image";

export default function Profile() {
  return (
    <div className="flex p-2 flex-col justify-center">
      <div className="flex flex-col gap-6 w-full">
        <div className="flex gap-6">
          <img
            src={"https://placehold.co/400"}
            width={400}
            height={400}
            alt="Profile picture"
            className="w-24 rounded-2xl"
          />
          <div className="flex flex-col gap-y-1">
            <p className="text-xl font-semibold">Jean Dupont</p>
            <div className="flex  gap-4">
              <a href="" className="flex flex-col">
                <span>{95}</span> <span className="text-xs">followed</span>
              </a>
              <a href="" className="flex flex-col">
                <span>{87}</span> <span className="text-xs">following</span>
              </a>
            </div>
            <div className="flex flex-col">
              <p className="">My description about myself :)</p>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-evenly gap-x-1.5">
          <button className="bg-white px-2 py-1 rounded-sm  w-full">
            Edit profile
          </button>
          <button className="bg-white px-2 py-1 rounded-sm  w-full">
            Statistics
          </button>
        </div>
      </div>
    </div>
  );
}
