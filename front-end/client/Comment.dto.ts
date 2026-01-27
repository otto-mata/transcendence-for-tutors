export type CreateCommentDto = {
  content: string;
  parentCommentId?: string;
  mediaIds?: string[];
  mentions?: string[];
};

export type UpdateCommentDto = {
  content?: string;
  mediaIds?: string[];
  mentions?: string[];
};
