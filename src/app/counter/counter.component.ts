import { Component, inject } from "@angular/core";
import { AsyncPipe } from "@angular/common";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import {
  decrementAction,
  incrementAction,
  resetAction,
} from "@app/state/counter/counter.actions";
import { selectCounter } from "@app/state/counter/counter.selectors";

@Component({
  selector: "app-counter",
  imports: [AsyncPipe],
  template: `
    <div class="flex flex-col justify-center items-center space-y-4">
      <button
        class="submit inline-flex justify-center items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150"
        (click)="increment()"
      >
        Increment
      </button>

      <div>Current Count: {{ counter$ | async }}</div>

      <button
        class="submit inline-flex justify-center items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150"
        (click)="decrement()"
      >
        Decrement
      </button>

      <button
        class="submit inline-flex justify-center items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150"
        (click)="reset()"
      >
        Reset Counter
      </button>
    </div>
  `,
  styles: [],
})
export class CounterComponent {
  private store = inject(Store);

  counter$!: Observable<number>;

  constructor() {
    this.counter$ = this.store.select(selectCounter);
  }

  increment() {
    this.store.dispatch(incrementAction());
  }

  decrement() {
    this.store.dispatch(decrementAction());
  }

  reset() {
    this.store.dispatch(resetAction());
  }
}
