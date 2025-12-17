import axios from "axios";

interface MockPostData {
	userId: number;
	id: number;
	body: string;
};

export const PostList = async ({ id }: { id: number }) => {
	const posts = await axios.get<MockPostData[]>(`https://jsonplaceholder.typicode.com/posts`, {params: {userId: id}})
	if (posts.status != 200)
		return (<div>Error</div>);
	return (<div className="flex flex-col bg shadow rounded-md bg-gray-50">
		{posts.data.map(post=>{
			return <div>
				{post.body}
				<hr></hr>
			</div>
		})
		}
	</div>

	);
};
