
export interface ApiResponseDto<DataType>{
  data?:DataType;
  message: string;
  code?:string;
  error:boolean;
  timestamp:Date;
}

export interface PaginatedResponseDto<T> {
	data: T[];
	page?: number;
	limit?: number;
	total?: number;
	hasMore?: boolean;
}

export interface QueryParametersDto {
  page?   : number;
  limit?  : number;
  search? : string;
}
