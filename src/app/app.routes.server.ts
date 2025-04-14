import { inject } from "@angular/core";
import { PrerenderFallback, RenderMode, ServerRoute } from "@angular/ssr";
import { AuthService, PostService } from "./_services";
import { lastValueFrom } from "rxjs";
import { RecipeService } from "./_services/recipe.service";
import { ProductService } from "./_services/product.service";

export const serverRoutes: ServerRoute[] = [
  {
    path: "",
    renderMode: RenderMode.Prerender,
  },
  {
    path: "about",
    renderMode: RenderMode.Prerender,
  },
  // {
  //   path: "posts/:id",
  //   renderMode: RenderMode.Prerender,
  //   fallback: PrerenderFallback.Server,
  //   async getPrerenderParams() {
  //     const service = inject(PostService);
  //     const postResp = lastValueFrom(service.getPosts());
  //     const posts = (await postResp).posts.map((post) => ({
  //       id: `${post.id}`,
  //     }));

  //     return posts ? posts : [];
  //   },
  // },
  // {
  //   path: "recipes/:id",
  //   renderMode: RenderMode.Prerender,
  //   fallback: PrerenderFallback.Server,
  //   async getPrerenderParams() {
  //     const service = inject(RecipeService);
  //     const recipeResp = service.getRecipes();
  //     const recipes = recipeResp()?.recipes.map((recipe) => {
  //       return { id: `${recipe.id}` };
  //     });

  //     return recipes ? recipes : [];
  //   },
  // },
  // {
  //   path: "products/:id",
  //   renderMode: RenderMode.Prerender,
  //   fallback: PrerenderFallback.Server,
  //   async getPrerenderParams() {
  //     const service = inject(ProductService);
  //     const recipeResp = lastValueFrom(service.getProducts());
  //     const products = (await recipeResp).products.map((product) => ({
  //       id: `${product.id}`,
  //     }));

  //     return products ? products : [];
  //   },
  // },
  {
    path: "**",
    renderMode: RenderMode.Server,
  },
];
