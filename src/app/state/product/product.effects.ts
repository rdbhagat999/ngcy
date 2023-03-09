import { Injectable } from "@angular/core";
import { ProductService } from "@app/_services/product.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, exhaustMap, catchError } from "rxjs/operators";
import {
  loadProductsAction,
  LoadProductsFailureActionType,
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
          map((productApiRes) => {
            return loadProductsSuccessAction({
              productApiResponse: productApiRes,
            });
          }),
          catchError(() => of({ type: LoadProductsFailureActionType }))
        );
      })
    )
  );
}
