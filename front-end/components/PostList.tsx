"use client"
import { PaginatedResponseDto  } from '@client/common.dto';
import { PostResponseDto } from '@/client/post.dto';


interface MockPostData {
	userId: number;
	id: number;
	body: string;
};

function LikePost(){
	//fetch POST asslike
	console.log("yep ! It clicked");
}

function CommentPost(){
	//fetch POST asslike
	console.log("yep ! It clicked");
}

function RepostPost(){
	//fetch POST asslike
	console.log("yep ! It clicked");
}

function buttonApearance(alreadyDone?: boolean){
	if (alreadyDone) return ("w-1/3 flex justify-center bg-blue-600 hover:bg-gray-900 transition-colors");
	return ("w-1/3 flex justify-center hover:bg-blue-600 transition-colors");
}


export const PostList = ({posts}: {posts : PaginatedResponseDto<PostResponseDto>}) => {
	//const posts = await axios.get<MockPostData[]>(`https://jsonplaceholder.typicode.com/posts`, { params: { userId: id } })
	if (!posts)
		return (<div>Error</div>);
	return (<div className="flex flex-col bg">
		{posts?.data?.map(post => {
			return <div key={post.id} className="m-2 shadow rounded-md bg-gray-100 pt-1 dark:bg-gray-800">
				<div className="flex justify-end px-4">
					<span className="text-xs">$</span>
				</div>
				<div className="px-4 mb-2 xl:my-6">{post.content}</div>
				<div className="w-full border-t border-t-gray-200 dark:border-t-gray-900 p-2 flex text-xs">
					<button onClick={CommentPost} className="w-1/3 flex justify-center hover:bg-blue-600 transition-colors">{post.replies} Comments</button>
					<span className="w-0 border-l border-gray-200 dark:border-l-gray-900" ></span>
					<button onClick={LikePost} className={buttonApearance(post.liked)}>{post.likes} Likes</button>
					<span className="w-0 border-r border-gray-200 dark:border-r-gray-900"></span>
					<button onClick={RepostPost} className={buttonApearance(post.bookmarked)}>{post.shares} Reposts</button>
					{/* Should not be bookmarked but Reposted up there */}
				</div>
			</div>
		})
		}
	</div >
	);
};
