import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CounterState } from "./counter.state";

export const counterFeatureKey = "counter_feature_key";

export const counterFeature =
  createFeatureSelector<CounterState>(counterFeatureKey);

export const selectCounter = createSelector(
  counterFeature,
  (state) => state.counter
);
