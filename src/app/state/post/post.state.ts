import { IPost, IPostAPIResponse } from "@app/_shared/_models";

export const postFeatureKey = "post_feature_key";

export type currentPostType = {
  currentPost: IPost | null;
};

export type yourPostsType = {
  yourPosts: IPost[];
};

export type PostState = IPostAPIResponse & currentPostType & yourPostsType;

export const postInitialState: PostState = {
  posts: [],
  total: 0,
  skip: 0,
  limit: 10,
  currentPost: null,
  yourPosts: [],
};
