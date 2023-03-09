import { counterFeatureKey } from "./counter/counter.selectors";
import { CounterState } from "./counter/counter.state";
import { postFeatureKey, PostState } from "./post/post.state";
import { productFeatureKey, ProductState } from "./product/product.state";

export interface AppState {
  [counterFeatureKey]: CounterState;
  [productFeatureKey]: ProductState;
  [postFeatureKey]: PostState;
}
