import { Injectable, inject } from "@angular/core";
import { ProductService } from "@app/_services/product.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, exhaustMap } from "rxjs/operators";
import {
  loadProductsAction,
  loadProductsSuccessAction,
} from "./product.actions";

@Injectable()
export class ProductEffects {
  private actions$ = inject(Actions);
  private productService = inject(ProductService);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

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
