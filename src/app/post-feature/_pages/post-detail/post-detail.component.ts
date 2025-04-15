import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  Signal,
} from "@angular/core";
import { IPost } from "@app/_shared/_models";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { switchMap } from "rxjs";

import { Store } from "@ngrx/store";
import { selectCurrentPost } from "@app/state/post/post.selectors";
import { loadPostByIdAction } from "@app/state/post/post.actions";
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
  selector: "app-post-detail",
  imports: [RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="post-list">
      <div class="overflow-hidden bg-white shadow sm:rounded-lg">
        <div class="px-4 pt-5 sm:px-6">
          <h1
            data-cy="post-title"
            class="text-lg font-medium leading-6 text-gray-900"
          >
            {{ postSignal()?.title || "Loading" }}
          </h1>
          <p data-cy="post-body" class="mt-1 max-w-2xl text-sm text-gray-500">
            {{ postSignal()?.body || "Loading" }}
          </p>
        </div>

        <div class="bg-white px-4 py-5 sm:grid sm:px-6">
          <h2 class="text-base mb-2 font-medium leading-6 text-gray-900">
            Tags
          </h2>
          <ul
            role="list"
            class="divide-y divide-gray-200 rounded-md border border-gray-200"
          >
            @defer { @for (tag of postSignal()?.tags; track tag) {
            <li
              class="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
            >
              <div class="flex w-0 flex-1 items-center">
                <svg
                  class="h-5 w-5 flex-shrink-0 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="ml-2 w-0 flex-1 truncate">{{ tag }}</span>
              </div>
            </li>
            } } @placeholder (minimum 3s) { @for (tag of [0,1]; track tag) {
            <li
              class="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
            >
              <div class="flex w-0 flex-1 items-center">
                <svg
                  class="h-5 w-5 flex-shrink-0 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="ml-2 w-0 flex-1 truncate">Loading...</span>
              </div>
            </li>
            } }
          </ul>
        </div>
      </div>
    </section>
  `,
  styles: [],
})
export class PostDetailComponent implements OnInit {
  private store: Store = inject(Store);

  postSignal: Signal<IPost | null> = signal(null);

  private route = inject(ActivatedRoute);

  constructor() {
    const post$ = this.route.paramMap.pipe(
      switchMap((params) => {
        this.store.dispatch(
          loadPostByIdAction({ id: +(params.get("id") ?? 0) })
        );
        return this.store.select(selectCurrentPost);
      })
    );

    this.postSignal = toSignal(post$, { initialValue: null });
  }

  ngOnInit(): void {
    // this.post$ = this.route.paramMap.pipe(
    //   switchMap((params) =>
    //     this.postService.getPostById(+(params.get("id") ?? 0))
    //   )
    // );
  }
}
