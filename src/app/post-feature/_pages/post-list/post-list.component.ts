import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from "@angular/core";
import { AsyncPipe, NgForOf, NgIf } from "@angular/common";
import { RouterModule } from "@angular/router";
import { PostService } from "@app/_services";
import { PostCardComponent } from "@app/post-feature/_components/post-card/post-card.component";
import { Observable } from "rxjs";
import { IPost } from "@app/_shared/_models";
import { ToastrService } from "@app/toastr";

@Component({
  selector: "app-post-list",
  standalone: true,
  imports: [NgIf, NgForOf, AsyncPipe, RouterModule, PostCardComponent],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="post-list">
      <div class="overflow-hidden bg-white shadow sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6">
          <h3 class="text-lg font-medium leading-6 text-gray-900">Post list</h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">
            Displays a list of posts from all authors.
          </p>
        </div>

        <div class="bg-white px-4 py-5 sm:grid sm:px-6">
          <ul
            role="list"
            class="divide-y divide-gray-200 rounded-md border border-gray-200">
            <ng-container *ngIf="posts$ | async as posts">
              <app-post-card
                *ngFor="let post of posts"
                [post]="post"></app-post-card>
            </ng-container>
          </ul>
        </div>
      </div>
    </section>
  `,
  styles: [],
})
export class PostListComponent implements OnInit {
  private postService: PostService = inject(PostService);
  public toastrService: ToastrService = inject(ToastrService);

  options = {
    autoClose: true,
    keepAfterRouteChange: true,
  };

  posts$!: Observable<IPost[]>;

  ngOnInit() {
    this.posts$ = this.postService.getPosts();
  }

  trackById(index: number, item: IPost) {
    return item.id;
  }
}
