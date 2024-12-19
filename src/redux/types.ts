export interface Post {
  id: string;
  title: string;
  selftext: string;
  author: string;
  subreddit: string;
  created_utc: number;
  num_comments: number;
  image?: string | null;
  thumbnail?: string | null;
}

export interface Comment {
  id: string;
  body: string;
  author: string;
  created_utc: number;
  score: number;
}

export interface RedditPostChild {
  data: Post;
}

export interface RedditCommentChild {
  data: Comment;
}

export interface RedditPostApiResponse {
  data: {
    children: RedditPostChild[];
  };
}

export interface RedditCommentApiResponse {
  data: {
    children: RedditCommentChild[];
};
}
