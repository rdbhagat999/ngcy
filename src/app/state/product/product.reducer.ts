import { IProductsAPIResponse } from "@app/_shared/_models";
import { createReducer, on } from "@ngrx/store";
import {
  addProductAction,
  loadProductsAction,
  loadProductsSuccessAction,
  removeProductAction,
} from "./product.actions";

export const initialState: IProductsAPIResponse = {
  products: [],
  total: 0,
  skip: 0,
  limit: 10,
};

export const productReducer = createReducer(
  initialState,
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
