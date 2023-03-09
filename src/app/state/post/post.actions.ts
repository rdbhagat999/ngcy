import { IPost, IPostAPIResponse } from "@app/_shared/_models";
import { createAction, props } from "@ngrx/store";

export const LoadPostsActionType = "[Post Component] Load Posts";
export const LoadPostsSuccessActionType = "[Post Component] Load Posts Success";
export const LoadPostsFailureActionType = "[Post Component] Load Posts Failure";

export const LoadPostsByUserIdActionType =
  "[Post Component] Load Posts By UserId";
export const LoadPostsByUserIdSuccessActionType =
  "[Post Component] Load Posts By UserId Success";
export const LoadPostsByUserIdFailureActionType =
  "[Post Component] Load Posts By UserId Failure";

export const LoadPostByIdActionType = "[Post Component] Load PostById";
export const LoadPostByIdSuccessActionType =
  "[Post Component] Load PostById Success";
export const LoadPostByIdFailureActionType =
  "[Post Component] Load PostById Failure";

export const loadPostsAction = createAction(
  LoadPostsActionType,
  props<{ page: number; limit: number }>()
);

export const loadPostsSuccessAction = createAction(
  LoadPostsSuccessActionType,
  props<{ postApiResponse: IPostAPIResponse }>()
);

export const loadPostByIdAction = createAction(
  LoadPostByIdActionType,
  props<{ id: number }>()
);

export const loadPostByIdSuccessAction = createAction(
  LoadPostByIdSuccessActionType,
  props<{ post: IPost }>()
);

export const loadPostsByUserIdAction = createAction(
  LoadPostsByUserIdActionType,
  props<{ userId: number }>()
);

export const loadPostsByUserIdSuccessAction = createAction(
  LoadPostsByUserIdSuccessActionType,
  props<{ postApiResponse: IPostAPIResponse }>()
);
