import { IProduct, IProductAPIResponse } from "@app/_shared/_models";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { productFeatureKey } from "./product.state";

export const productsFeature =
  createFeatureSelector<IProductAPIResponse>(productFeatureKey);

export const selectProductsApiResponse = createSelector(
  productsFeature,
  (state) => state
);

export const selectProducts = createSelector(
  productsFeature,
  (state) => state.products as ReadonlyArray<IProduct>
);
