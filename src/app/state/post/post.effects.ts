import { Injectable, inject } from "@angular/core";
import { PostService } from "@app/_services";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap } from "rxjs/operators";
import {
  loadPostByIdAction,
  loadPostByIdSuccessAction,
  loadPostsAction,
  loadPostsByUserIdAction,
  loadPostsByUserIdSuccessAction,
  loadPostsSuccessAction,
} from "./post.actions";

@Injectable()
export class PostEffects {
  private actions$ = inject(Actions);
  private postService = inject(PostService);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPostsAction),
      switchMap((action) => {
        console.log("action", action);
        return this.postService.getPosts(action.page, action.limit).pipe(
          map((postApiResponse) => {
            return loadPostsSuccessAction({ postApiResponse });
          })
          // catchError(() => of({ type: LoadPostsFailureActionType }))
        );
      })
    )
  );

  loadPostById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPostByIdAction),
      switchMap((action) => {
        console.log("action", action);
        return this.postService.getPostById(action.id).pipe(
          map((post) => {
            return loadPostByIdSuccessAction({ post });
          })
          // catchError(() => of({ type: loadPostByIdFailureAction }))
        );
      })
    )
  );

  loadPostsByUserId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPostsByUserIdAction),
      switchMap((action) => {
        console.log("action", action);
        return this.postService.getAllPostsByUserId(action.userId).pipe(
          map((postApiResponse) => {
            return loadPostsByUserIdSuccessAction({ postApiResponse });
          })
          // catchError(() => of({ type: loadPostByIdFailureAction }))
        );
      })
    )
  );
}
