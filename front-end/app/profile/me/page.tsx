import { PostList } from "@/components/PostList";
import Image from "next/image";

export default function Profile() {
  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-col gap-6 w-full pt-2 px-2 pb-4 shadow rounded-md bg-gray-50">
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
          <button className="bg-gray-100 border border-gray-200 px-2 py-1 rounded-sm  w-full">
            Edit profile
          </button>
          <button className="bg-gray-100 border border-gray-200 px-2 py-1 rounded-sm  w-full">
            Statistics
          </button>
        </div>
      </div>
	  <PostList id={1} />
    </div>
  );
}
