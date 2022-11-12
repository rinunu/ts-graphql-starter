export type PostId = string;

export interface Post {
  id: PostId;
  authorId: string;
  content: string;
  createdAt: Date;
}
