import { Route } from "@angular/router";
import { PostService } from "@app/_services";
import { PostDetailComponent } from "./_pages/post-detail/post-detail.component";
import { PostListComponent } from "./_pages/post-list/post-list.component";

export const POST_ROUTES: Route[] = [
  {
    path: "",
    pathMatch: "prefix",
    providers: [PostService],
    children: [
      { path: "", component: PostListComponent },
      { path: ":id", component: PostDetailComponent },
    ],
  },
];
