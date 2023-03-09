import { IPost, IProductsAPIResponse } from "@app/_shared/_models";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export const counterFeatureKey = "counter_feature_key";
export const productFeatureKey = "product_feature_key";
export const postFeatureKey = "post_feature_key";

export interface AppState {
  [counterFeatureKey]: { counter: number };
  [productFeatureKey]: IProductsAPIResponse;
  [postFeatureKey]: IPost[];
}

// const selectCounterState = (state: AppState) => state[counterFeatureKey];
// const selectProductsState = (state: AppState) => state[productFeatureKey];
// const selectPostsState = (state: AppState) => state[postFeatureKey];

export const counterFeature = createFeatureSelector<{ counter: number }>(
  counterFeatureKey
);

export const productFeature = createFeatureSelector<{
  productApiResponse: IProductsAPIResponse;
}>(productFeatureKey);

export const postFeature = createFeatureSelector<{
  posts: IPost[];
}>(postFeatureKey);

export const selectPosts = createSelector(postFeature, (state) => state.posts);

export const selectProducts = createSelector(
  productFeature,
  (state) => state.productApiResponse.products
);
export const selectTotal = createSelector(
  productFeature,
  (state) => state.productApiResponse.total
);
export const selectLimit = createSelector(
  productFeature,
  (state) => state.productApiResponse.limit
);
