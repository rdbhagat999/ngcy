import { IPost, IProduct, IProductsAPIResponse } from "@app/_shared/_models";
import { createAction, props } from "@ngrx/store";

export const loadPostsActionType = "[Post Component] Load Posts";

export const loadPostsSuccessActionType = "[Post Component] Load Posts Success";

export const loadPostsFailureActionType = "[Post Component] Load Posts Failure";

export const loadPostsAction = createAction(
  loadPostsActionType,
  props<{ limit: number }>()
);

export const loadPostsSuccessAction = createAction(
  loadPostsSuccessActionType,
  props<{ posts: IPost[] }>()
);
