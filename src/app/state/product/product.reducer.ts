import { createReducer, on } from "@ngrx/store";
import {
  addProductAction,
  loadProductsAction,
  loadProductsSuccessAction,
  removeProductAction,
} from "./product.actions";
import { productInitialState } from "./product.state";

export const productReducer = createReducer(
  productInitialState,
  on(addProductAction, (state, { product }) => ({
    ...state,
    products: [...state.products, product],
    total: state.total + 1,
  })),
  on(loadProductsAction, (state) => state),
  on(loadProductsSuccessAction, (state, { productApiResponse }) => ({
    ...productApiResponse,
  })),
  on(removeProductAction, (state, { product }) => ({
    ...state,
    products: state.products.filter((p) => p.id != product.id),
    total: state.total - 1,
  }))
);
