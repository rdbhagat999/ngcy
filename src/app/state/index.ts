import { IPost, IProductsAPIResponse } from "@app/_shared/_models";
import { createFeatureSelector } from "@ngrx/store";

export const counterFeatureKey = "counter_feature_key";
export const productFeatureKey = "product_feature_key";
export const postFeatureKey = "post_feature_key";

// export interface AppState {
//   [counterFeatureKey]: { counter: number };
//   [productFeatureKey]: IProductsAPIResponse;
//   [postFeatureKey]: IPost[];
// }

// const selectCounterState = (state: AppState) => state[counterFeatureKey];
// const selectProductsState = (state: AppState) => state[productFeatureKey];
// const selectPostsState = (state: AppState) => state[postFeatureKey];

export const counterFeature = createFeatureSelector<{ counter: number }>(
  counterFeatureKey
);

export const selectProductsFeature =
  createFeatureSelector<IProductsAPIResponse>(productFeatureKey);

export const selectPostsFeature =
  createFeatureSelector<ReadonlyArray<IPost>>(postFeatureKey);
