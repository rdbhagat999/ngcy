import { IProduct, IProductAPIResponse } from "@app/_shared/_models";
import { createAction, props } from "@ngrx/store";

export const AddProductActionType = "[Product Component] AddProduct";
export const LoadProductsActionType = "[Product Component] Load Products";
export const LoadProductsSuccessActionType =
  "[Product Component] Load Products Success";
export const LoadProductsFailureActionType =
  "[Product Component] Load Products Failure";
export const RemoveProductActionType = "[Product Component] RemoveProduct";

export const addProductAction = createAction(
  AddProductActionType,
  props<{ product: IProduct }>()
);

export const loadProductsAction = createAction(
  LoadProductsActionType,
  props<{ page: number; limit: number }>()
);

export const loadProductsSuccessAction = createAction(
  LoadProductsSuccessActionType,
  props<{ productApiResponse: IProductAPIResponse }>()
);

export const removeProductAction = createAction(
  RemoveProductActionType,
  props<{ product: IProduct }>()
);
