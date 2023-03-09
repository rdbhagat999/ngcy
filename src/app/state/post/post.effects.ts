import { Injectable } from "@angular/core";
import { PostService } from "@app/_services";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, catchError, switchMap } from "rxjs/operators";
import {
  loadPostsAction,
  loadPostsFailureActionType,
  loadPostsSuccessAction,
} from "./post.actions";

@Injectable()
export class PostEffects {
  constructor(private actions$: Actions, private postService: PostService) {}

  loadProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPostsAction),
      switchMap((action) => {
        console.log("action", action);
        return this.postService.getPosts(action.limit || 10).pipe(
          map((posts) => {
            return loadPostsSuccessAction({ posts });
          }),
          catchError(() => of({ type: loadPostsFailureActionType }))
        );
      })
    )
  );
}
