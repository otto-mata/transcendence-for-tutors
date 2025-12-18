import axios from "axios";

interface MockPostData {
	userId: number;
	id: number;
	body: string;
};

export const PostList = async ({ id, isSelf }: { id: number, isSelf: boolean }) => {
	const posts = await axios.get<MockPostData[]>(`https://jsonplaceholder.typicode.com/posts`, { params: { userId: id } })
	if (posts.status != 200)
		return (<div>Error</div>);
	return (<div className="flex flex-col bg">
		{posts.data.map(post => {
			return <div key={post.id} className="m-2 shadow rounded-md bg-gray-100 pt-1 dark:bg-gray-800">
				<div className="flex justify-end px-4">
					<span className="text-xs">$</span>
				</div>
				<div className="px-4 mb-2 xl:my-6">{post.body}</div>
				<div className="w-full border-t border-t-gray-200 dark:border-t-gray-900 p-2 flex text-xs">
					<span className="w-1/3 flex justify-center">Comments</span>
					<span className="w-0 border-l border-gray-200 dark:border-l-gray-900" ></span>
					<span className="w-1/3 flex justify-center">Likes</span>
					<span className="w-0 border-r border-gray-200 dark:border-r-gray-900"></span>
					<span className="w-1/3 flex justify-center">Reposts</span>
				</div>
			</div>
		})
		}
	</div >
	);
};
