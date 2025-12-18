import { PostList } from "@/components/PostList";
import axios from "axios";
import Image from "next/image";

interface MockMeUserData {
  id: number;
  name: string;
  username: string;
  description: string;
  followers: number;
  following: number;
};

interface MockApiResponseUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
      lat: string,
      lng: string
    }
  };
  phone: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  }
}

const getMeData = async (): Promise<MockMeUserData> => {
  const res = await axios.get<MockApiResponseUser>(
    "https://jsonplaceholder.typicode.com/users/1"
  );
  const followers = 95;
  const following = 84;
  if (res.status != 200)
    return { description: "Description", id: 0, name: "No user", username: "default", followers, following };
  const { data } = res;
  return {
    id: data.id,
    description: "A wonderful description",
    name: data.name,
    username: data.username,
    followers,
    following
  }
}

export default async function Profile() {
  const userData = await getMeData();
  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-col gap-6 w-full pt-2 px-2 pb-4 shadow-background ">
        <div className="flex gap-6">
          <img
            src={"https://placehold.co/400"}
            width={400}
            height={400}
            alt="Profile picture"
            className="w-24 rounded-2xl"
          />
          <div className="flex flex-col gap-y-1">
            <p className="text-xl font-semibold">{userData.name}</p>
            <p className="">@{userData.username}</p>
            <div className="flex  gap-4">
              <a href="" className="flex flex-col">
                <span>{userData.followers}</span> <span className="text-xs">followers</span>
              </a>
              <a href="" className="flex flex-col">
                <span>{userData.following}</span> <span className="text-xs">following</span>
              </a>
            </div>
          </div>
        </div>
        <div>
          <p>{userData.description}</p>
        </div>
        <div className="w-full flex justify-evenly gap-x-1.5">
          <button className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 px-2 py-1 rounded-sm  w-full">
            Edit profile
          </button>
          <button className="bg-gray-100 border dark:bg-gray-900 border-gray-200 dark:border-gray-700 px-2 py-1 rounded-sm  w-full">
            Statistics
          </button>
        </div>
      </div>
      <PostList id={1} isSelf={true} />
    </div>
  );
}
