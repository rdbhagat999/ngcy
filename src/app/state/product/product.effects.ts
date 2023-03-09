import { Injectable } from "@angular/core";
import { ProductService } from "@app/_services/product.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, exhaustMap } from "rxjs/operators";
import {
  loadProductsAction,
  loadProductsSuccessAction,
} from "./product.actions";

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  loadProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProductsAction),
      exhaustMap((action) => {
        console.log("action", action);
        return this.productService.getProducts(action.page, action.limit).pipe(
          map((productApiResponse) => {
            return loadProductsSuccessAction({
              productApiResponse,
            });
          })
          // catchError(() => of({ type: LoadProductsFailureActionType }))
        );
      })
    )
  );
}
