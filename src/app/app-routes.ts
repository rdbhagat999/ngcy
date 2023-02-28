import { Route } from "@angular/router";
import { HomeComponent } from "@app/_pages";
import { AuthGuard, RegisterDeactivateGuard } from "./_shared/guards";

export const APP_ROUTES: Route[] = [
  {
    path: "",
    pathMatch: "full",
    component: HomeComponent,
  },
  {
    path: "posts",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("@app/post-feature/routes").then((mod) => mod.POST_ROUTES),
  },
  {
    path: "login",
    loadComponent: () =>
      import("@app/_pages").then((mod) => mod.LoginComponent),
  },
  {
    path: "register",
    canDeactivate: [RegisterDeactivateGuard],
    loadComponent: () =>
      import("@app/_pages").then((mod) => mod.RegisterComponent),
  },
  {
    path: "profile/:id",
    canActivate: [AuthGuard],
    loadComponent: () =>
      import("@app/_pages").then((mod) => mod.UserProfileComponent),
  },
  {
    path: "products",
    canActivate: [AuthGuard],
    loadComponent: () =>
      import("@app/product-list/product-list.component").then(
        (mod) => mod.ProductListComponent
      ),
  },
  {
    path: "about",
    loadComponent: () =>
      import("@app/_pages").then((mod) => mod.AboutComponent),
  },
  {
    path: "**",
    loadComponent: () =>
      import("@app/_pages").then((mod) => mod.PageNotFoundComponent),
  },
];
