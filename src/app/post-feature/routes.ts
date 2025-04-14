import { Route } from "@angular/router";
import { PostService } from "@app/_services";



export const POST_ROUTES: Route[] = [
  {
    path: "",
    pathMatch: "prefix",
    providers: [{ provide: PostService, useClass: PostService }],
    children: [
      { path: "", loadComponent: () => import('./_pages/post-list/post-list.component').then(m => m.PostListComponent) },
      { path: ":id", loadComponent: () => import('./_pages/post-detail/post-detail.component').then(m => m.PostDetailComponent) },
    ],
  },
];
