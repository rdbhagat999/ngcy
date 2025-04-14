import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  Signal,
} from "@angular/core";

import { RecipeService } from "@app/_services/recipe.service";
import { IRecipeAPIResponse } from "@app/_shared/_models";

@Component({
    selector: "app-recipe-list",
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [],
    hostDirectives: [],
    providers: [],
    template: `
    <section class="recipe-list grid grid-cols-1 gap-4">
      <article>
        <div class="overflow-hidden bg-white shadow sm:rounded-lg">
          <div class="px-4 py-5 sm:px-6">
            <h3
              data-cy="recipe-list"
              class="text-lg font-medium leading-6 text-gray-900"
            >
              Recipe list
            </h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
              Displays a list of recipes.
            </p>
          </div>

          <div class="bg-white px-4 py-5 sm:grid sm:px-6">
            <ul
              role="list"
              class="divide-y divide-gray-200 rounded-md border border-gray-200"
            >
              @defer (when (recipeListSignal()?.recipes)?.length) { @for (recipe
              of recipeListSignal()?.recipes; track recipe.id) { @defer (on
              viewport) {
              <li
                class="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
              >
                {{ recipe?.name }}
              </li>
              } @placeholder (minimum 2s) {
              <p>Recipe list</p>
              } @loading (minimum 2s) {
              <li
                class="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
              >
                Loading recipes...
              </li>
              } } }
            </ul>
          </div>
        </div>
      </article>
    </section>
  `,
    styles: []
})
export class RecipieListComponent implements OnInit {
  private recipeService = inject(RecipeService);

  recipeListSignal: Signal<IRecipeAPIResponse | null>;

  constructor() {
    this.recipeListSignal = this.recipeService.getRecipes();
  }

  ngOnInit() {}
}
