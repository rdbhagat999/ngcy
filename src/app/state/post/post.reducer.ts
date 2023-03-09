import { IPost } from "@app/_shared/_models";
import { createReducer, on, createFeatureSelector } from "@ngrx/store";
import { loadPostsAction, loadPostsSuccessAction } from "./post.actions";

export const initialState: IPost[] = [];

export const postReducer = createReducer(
  initialState,
  on(loadPostsAction, (state) => state),
  on(loadPostsSuccessAction, (state, { posts }) => {
    const updated = [...posts];
    console.log("loadPostsSuccessAction", updated);
    return updated;
  })
);
