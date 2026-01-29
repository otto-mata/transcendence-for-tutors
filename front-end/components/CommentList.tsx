"use client"\nimport { CommentResponseDto } from "@/client/comment.dto";\nimport { PaginatedResponseDto } from "@/client/common.dto";\nimport { Backend } from "@/client/TransClient";\nimport { getMediaUrl } from "@/client/utils";\nimport Link from "next/link";\nimport { useRouter } from "next/navigation";\nimport { useEffect, useState } from "react";


export const OneComment = ({comment} : {comment : CommentResponseDto}) => {
	const client = Backend.getInstance();
	const [Liked, setLiked] = useState(comment.liked);

  	async function LikeComment(comment : CommentResponseDto){

		if (!Liked){
			const res  = await client.posts.$(comment.postId).comments.$(comment.id).like();
			if (!res.ok)
				return;
			setLiked(true);
			comment.likeCount += 1;
			return;
		}
		const res  = await client.posts.$(comment.postId).comments.$(comment.id).unlike();
		if (!res.ok)
			return;
		setLiked(false);
		comment.likeCount -= 1;
	}
	return (
	<div
		className="break-inside-avoid bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow cursor-pointer group"
		>
			<div className="p-4">
				<div className="flex items-center gap-3 mb-3">
					<Link href={`profile/${comment.author?.username} `} className="shrink-0">
						{comment.author?.avatarUrl ? (
							<img 
								src={getMediaUrl(comment.author.avatarUrl)} 
								alt={comment.author.username}
								className="w-10 h-10 rounded-full object-cover"
							/>
						) : (
							<div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-400 to-pink-400" />
						)}
					</Link>
					<div>
						<Link href={`profile/${comment.author?.username} `}>
							<h4 className="font-semibold text-sm text-gray-900 dark:text-gray-50">
								{comment.author?.username}
							</h4>
						</Link>
						<p className="text-xs text-gray-500">{"tkt"}</p>
					</div>
				</div>
				<p className="text-gray-700 dark:text-gray-300 text-sm mb-3">{comment.content}</p>
				<div className="flex items-center justify-between text-gray-500">
					<div className="flex gap-4 text-sm">
						<button onClick={() => LikeComment(comment)} className={ Liked ? ' text-red-500 hover:text-gray-700 dar:hover:text-gray-300 transition-colors cursor-pointer' : 'hover:text-red-500 transition-colors cursor-pointer' }>
							❤️ {comment.likeCount}
						</button>
						{/* <button onClick={() => {}} className="hover:text-blue-500 transition-colors cursor-pointer">
							💬 {"trkl"}
						</button> */}
					</div>
				</div>
			</div>


	</div>)
}



export const CommentList = ({comments}: {comments : PaginatedResponseDto<CommentResponseDto>}) => {
  if (!comments)
		return (<div>Error</div>);
	
  const client = Backend.getInstance();
  const router = useRouter();


  	//const comments = await axios.get<MockPostData[]>(`https://jsonplaceholder.typicode.com/comments`, { params: { userId: id } })
	if (comments)
	return (<div className="flex flex-col bg">
		{comments.data?.map(comment => <OneComment key={comment.id} comment={comment}/>)}
	</div>);
}