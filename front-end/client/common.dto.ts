
export class ApiResponseDto<DataType>{
  data?:DataType;
  message: string;
  code?:string;
  error:bool;
  timestamp:Date;
}

export class PaginatedResponseDto<T> {
	data: T[];
	page?: number;
	limit?: number;
	total?: number;
	hasMore?: boolean;
}

export class QueryParametersDto {
  page?   : number;
  limit?  : number;
  search? : string;
}
