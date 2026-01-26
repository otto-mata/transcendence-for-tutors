import { CommentResponseDto } from "@/client/comment.dto";
import { PaginatedResponseDto } from "@/client/common.dto";
import { TransClient } from "@/client/TransClient";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const CommentList = ({comments}: {comments : PaginatedResponseDto<CommentResponseDto>}) => {
  if (!comments)
		return (<div>Error</div>);
	
  const client = TransClient.get_instance();
  const router = useRouter();

  function LikeComment(comment : CommentResponseDto){
	client.likeComment(comment.post.id, comment.id, comment.liked);
	console.log("wtaf " + comment.id);
	router.refresh();
	}

  	//const comments = await axios.get<MockPostData[]>(`https://jsonplaceholder.typicode.com/comments`, { params: { userId: id } })
	if (comments)
	return (<div className="flex flex-col bg">
		{comments.data?.map((comment, index) => (
			<div
				key={index}
				className="break-inside-avoid bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow cursor-pointer group"
				>
					<div className="p-4">
						<div className="flex items-center gap-3 mb-3">
							<Link href={`profile/${comment.author.username} `} className="w-10 h-10 rounded-full bg-linear-to-br from-purple-400 to-pink-400" />
							<div>
								<Link href={`profile/${comment.author.username} `}>
									<h4 className="font-semibold text-sm text-gray-900 dark:text-gray-50">
										{comment.author.displayName}
									</h4>
								</Link>
								<p className="text-xs text-gray-500">{comment.createdAt ? comment.createdAt.getDate() : null}</p>
							</div>
						</div>
						<p className="text-gray-700 dark:text-gray-300 text-sm mb-3">{comment.content}</p>
						<div className="flex items-center justify-between text-gray-500">
							<div className="flex gap-4 text-sm">
								<button onClick={() => LikeComment(comment)} className={ comment.liked ? ' text-red-500 hover:text-gray-700 dar:hover:text-gray-300 transition-colors cursor-pointer' : 'hover:text-red-500 transition-colors cursor-pointer' }>
									❤️ {comment.likes}
								</button>
								<button onClick={() => {}} className="hover:text-blue-500 transition-colors cursor-pointer">
									💬 {comment.post.replies}
								</button>
							</div>
						</div>
					</div>


		</div>))}
	</div>);
}