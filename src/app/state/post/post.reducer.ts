import { createReducer, on } from "@ngrx/store";
import {
  loadPostByIdAction,
  loadPostByIdSuccessAction,
  loadPostsAction,
  loadPostsByUserIdAction,
  loadPostsByUserIdSuccessAction,
  loadPostsSuccessAction,
} from "./post.actions";
import { postInitialState } from "./post.state";

export const postReducer = createReducer(
  postInitialState,
  on(loadPostsAction, (state) => state),
  on(loadPostsSuccessAction, (state, { postApiResponse }) => ({
    ...state,
    ...postApiResponse,
  })),

  on(loadPostsByUserIdAction, (state) => state),
  on(loadPostsByUserIdSuccessAction, (state, { postApiResponse }) => ({
    ...state,
    yourPosts: postApiResponse.posts,
  })),

  on(loadPostByIdAction, (state) => state),
  on(loadPostByIdSuccessAction, (state, { post }) => ({
    ...state,
    currentPost: post,
  }))
);
