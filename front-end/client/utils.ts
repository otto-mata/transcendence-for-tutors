export function getMediaUrl(path: string | null | undefined): string | undefined {
	if (!path) return undefined;
	
	if (path.startsWith('http://') || path.startsWith('https://')) {
		return path;
	}
	
	if (path.startsWith('data:')) {
		return path;
	}
	
	const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:8443/api';
	
	const baseUrl = apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl;
	
	const normalizedPath = path.startsWith('/') ? path : `/${path}`;
	
	return `${baseUrl}${normalizedPath}`;
}
