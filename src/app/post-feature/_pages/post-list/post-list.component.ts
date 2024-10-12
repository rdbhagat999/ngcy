import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  Signal,
} from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthService } from "@app/_services";
import { PostCardComponent } from "@app/post-feature/_components/post-card/post-card.component";
import { IDummyAuthUser, IPost, ROLE } from "@app/_shared/_models";
import { ToastrService } from "@app/toastr";
import { Store } from "@ngrx/store";
import {
  loadPostsAction,
  loadPostsByUserIdAction,
} from "@app/state/post/post.actions";
import { selectPosts, selectYourPosts } from "@app/state/post/post.selectors";
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
  selector: "app-post-list",
  standalone: true,
  imports: [RouterModule, PostCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      [class.md:grid-cols-2]="auth_user?.role === authorRole"
      class="post-list grid grid-cols-1 gap-4"
    >
      <article>
        <div class="overflow-hidden bg-white shadow sm:rounded-lg">
          <div class="px-4 py-5 sm:px-6">
            <h3
              data-cy="post-list"
              class="text-lg font-medium leading-6 text-gray-900"
            >
              Post list
            </h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
              Displays a list of posts from all authors.
            </p>
          </div>

          <div class="bg-white px-4 py-5 sm:grid sm:px-6">
            <ul
              role="list"
              class="divide-y divide-gray-200 rounded-md border border-gray-200"
            >
              @if (postListSignal().length) { @for (post of postListSignal();
              track post.id) { @defer (on viewport) {
              <app-post-card
                [auth_user]="auth_user"
                [post]="post"
              ></app-post-card>
              } @placeholder {
              <p>Post list</p>
              } @loading (minimum 2s) {
              <p>Loading posts...</p>
              } } }
            </ul>
          </div>
        </div>
      </article>

      @if (auth_user?.role === authorRole) {
      <article>
        <div class="overflow-hidden bg-white shadow sm:rounded-lg">
          <div class="px-4 py-5 sm:px-6">
            <h3
              data-cy="your-post-list"
              class="text-lg font-medium leading-6 text-gray-900"
            >
              Your post list
            </h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
              Displays a list of posts from you.
            </p>
          </div>

          <div class="bg-white px-4 py-5 sm:grid sm:px-6">
            <ul
              role="list"
              class="divide-y divide-gray-200 rounded-md border border-gray-200"
            >
              @if (yourPostListSignal().length) { @for (yourPost of
              yourPostListSignal(); track yourPost.id) { @defer (on viewport) {
              <app-post-card
                [auth_user]="auth_user"
                [post]="yourPost"
              ></app-post-card>
              } @placeholder {
              <p>Post list</p>
              } @loading (minimum 2s) {
              <p>Loading posts...</p>
              } } }
            </ul>
          </div>
        </div>
      </article>
      }
    </section>
  `,
  styles: [],
})
export class PostListComponent implements OnInit {
  private authService: AuthService = inject(AuthService);
  public toastrService: ToastrService = inject(ToastrService);
  private store: Store = inject(Store);

  authorRole = ROLE.AUTHOR;
  adminRole = ROLE.ADMIN;
  auth_user!: IDummyAuthUser | null;

  options = {
    autoClose: true,
    keepAfterRouteChange: true,
  };

  postListSignal: Signal<IPost[]>;
  yourPostListSignal: Signal<IPost[]>;

  constructor() {
    this.auth_user = this.authService.getAuthUser();
    this.store.dispatch(loadPostsAction({ page: 0, limit: 10 }));
    this.store.dispatch(
      loadPostsByUserIdAction({ userId: this.auth_user?.id || 0 })
    );

    const posts$ = this.store.select(selectPosts);
    const yourPosts$ = this.store.select(selectYourPosts);

    this.postListSignal = toSignal(posts$, { initialValue: [] as IPost[] });

    this.yourPostListSignal = toSignal(yourPosts$, {
      initialValue: [] as IPost[],
    });
  }

  ngOnInit() {}

  // trackById(index: number, item: IPost) {
  //   return item.id;
  // }
}
