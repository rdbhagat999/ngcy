import { createReducer, on } from "@ngrx/store";
import {
  incrementAction,
  decrementAction,
  resetAction,
} from "./counter.actions";
import { counterInitialState } from "./counter.state";

export const counterReducer = createReducer(
  counterInitialState,
  on(incrementAction, (state) => ({ counter: state.counter + 1 })),
  on(decrementAction, (state) => ({ counter: state.counter - 1 })),
  on(resetAction, (state) => ({ counter: 0 }))
);
