import { IPost } from "@app/_shared/_models";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { postFeatureKey, PostState } from "./post.state";

export const postsFeature = createFeatureSelector<PostState>(postFeatureKey);

export const selectPostApiResponse = createSelector(
  postsFeature,
  (state) => state.posts as ReadonlyArray<IPost>
);

export const selectPosts = createSelector(
  postsFeature,
  (state) => state.posts as ReadonlyArray<IPost>
);

export const selectYourPosts = createSelector(
  postsFeature,
  (state) => state.yourPosts as ReadonlyArray<IPost>
);

export const selectCurrentPost = createSelector(
  postsFeature,
  (state) => state.currentPost as IPost
);
