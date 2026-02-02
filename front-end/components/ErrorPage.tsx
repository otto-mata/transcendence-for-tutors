
export const ErrorPage = (params : {error : string | null, message : string}) => {
	return (
				<div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
					<div className="text-center">
						<h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
							{params.error}
						</h2>
						<p className="text-gray-600 dark:text-gray-400">
							{params.message}
						</p>
					</div>
				</div>
			);
}