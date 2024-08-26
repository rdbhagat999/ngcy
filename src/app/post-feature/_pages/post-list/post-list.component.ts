import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { AuthService } from "@app/_services";
import { PostCardComponent } from "@app/post-feature/_components/post-card/post-card.component";
import { Observable } from "rxjs";
import { IDummyAuthUser, IPost, ROLE } from "@app/_shared/_models";
import { ToastrService } from "@app/toastr";
import { Store } from "@ngrx/store";
import {
  loadPostsAction,
  loadPostsByUserIdAction,
} from "@app/state/post/post.actions";
import { selectPosts, selectYourPosts } from "@app/state/post/post.selectors";

@Component({
  selector: "app-post-list",
  standalone: true,
  imports: [CommonModule, RouterModule, PostCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      [class.md:grid-cols-2]="auth_user?.role === authorRole"
      class="post-list grid grid-cols-1 gap-4">
      <article>
        <div class="overflow-hidden bg-white shadow sm:rounded-lg">
          <div class="px-4 py-5 sm:px-6">
            <h3
              data-cy="post-list"
              class="text-lg font-medium leading-6 text-gray-900">
              Post list
            </h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
              Displays a list of posts from all authors.
            </p>
          </div>

          <div class="bg-white px-4 py-5 sm:grid sm:px-6">
            <ul
              role="list"
              class="divide-y divide-gray-200 rounded-md border border-gray-200">
              <ng-container *ngIf="posts$ | async as posts">
                @for (post of posts; track post.id) {
                  @defer (on viewport) {
                    <app-post-card
                      [auth_user]="auth_user"
                      [post]="post"></app-post-card>
                  } @placeholder {
                    <p>Post list</p>
                  } @loading (minimum 2s) {
                    <p>Loading posts...</p>
                  }
                } 
              </ng-container>
            </ul>
          </div>
        </div>
      </article>

      <article *ngIf="auth_user?.role === authorRole">
        <div class="overflow-hidden bg-white shadow sm:rounded-lg">
          <div class="px-4 py-5 sm:px-6">
            <h3
              data-cy="your-post-list"
              class="text-lg font-medium leading-6 text-gray-900">
              Your post list
            </h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
              Displays a list of posts from you.
            </p>
          </div>

          <div class="bg-white px-4 py-5 sm:grid sm:px-6">
            <ul
              role="list"
              class="divide-y divide-gray-200 rounded-md border border-gray-200">
              <ng-container *ngIf="yourPosts$ | async as yourPosts">
                  @for (yourPost of yourPosts; track yourPost.id) {
                    @defer (on viewport) {
                      <app-post-card
                        [auth_user]="auth_user"
                        [post]="yourPost"></app-post-card>
                    } @placeholder {
                      <p>Post list</p>
                    } @loading (minimum 2s) {
                      <p>Loading posts...</p>
                    }
                  } 
              </ng-container>
            </ul>
          </div>
        </div>
      </article>
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

  posts$!: Observable<readonly IPost[]>;
  yourPosts$!: Observable<readonly IPost[]>;

  constructor() {
    this.auth_user = this.authService.getAuthUser();
    this.store.dispatch(loadPostsAction({ page: 0, limit: 10 }));
    this.store.dispatch(
      loadPostsByUserIdAction({ userId: this.auth_user?.id || 0 })
    );
  }

  ngOnInit() {
    this.posts$ = this.store.select(selectPosts);
    this.yourPosts$ = this.store.select(selectYourPosts);
  }

  trackById(index: number, item: IPost) {
    return item.id;
  }
}
