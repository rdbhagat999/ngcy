import { HttpClient } from "@angular/common/http";
import { inject, Injectable, Signal } from "@angular/core";
import { IRecipe, IRecipeAPIResponse } from "@app/_shared/_models";
import { BACKEND_API } from "@app/_shared/_models/BackendUrl";
import { toSignal } from "@angular/core/rxjs-interop";

@Injectable({
  providedIn: "root",
})
export class RecipeService {
  private _http = inject(HttpClient);
  private _backend_url = inject(BACKEND_API);

  constructor() {}

  getRecipes(
    page: number = 0,
    limit: number = 5
  ): Signal<IRecipeAPIResponse | null> {
    const skip = page * limit;

    console.log(page, skip, limit);

    return toSignal(
      this._http.get<IRecipeAPIResponse>(
        `${this._backend_url}/auth/recipes?skip=${skip}&limit=${limit}`,
        {
          reportProgress: false,
        }
      ),
      { initialValue: null }
    );
  }

  getAllRecipesByTag(): Signal<IRecipeAPIResponse> {
    return toSignal(
      this._http.get<IRecipeAPIResponse>(
        `${this._backend_url}/auth/recipes/tags`,
        {
          reportProgress: false,
        }
      ),
      { initialValue: {} as IRecipeAPIResponse }
    );
  }

  getAllRecipesByMealType(type: string): Signal<IRecipeAPIResponse> {
    return toSignal(
      this._http.get<IRecipeAPIResponse>(
        `${this._backend_url}/auth/recipes/meal-type/${type}`,
        {
          reportProgress: false,
        }
      ),
      { initialValue: {} as IRecipeAPIResponse }
    );
  }

  getRecipesByTag(tag: string): Signal<IRecipe> {
    return toSignal(
      this._http.get<IRecipe>(`${this._backend_url}/auth/recipes/tag/${tag}`, {
        reportProgress: false,
      }),
      { initialValue: {} as IRecipe }
    );
  }
}
