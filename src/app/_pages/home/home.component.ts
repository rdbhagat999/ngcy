import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  signal,
} from "@angular/core";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="home grid grid-cols-1 gap-4">
      <article>
        <div class="overflow-hidden bg-white shadow sm:rounded-lg">
          <div class="px-4 py-5 sm:px-6">
            <h3
              data-cy="title"
              class="text-lg font-medium leading-6 text-gray-900"
            >
              Home
            </h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">Angular signals</p>
          </div>

          <div class="px-4 pb-5 sm:px-6">
            <h2>qtySignal: {{ qtySignal() }}</h2>
            <h2>isEvenComputedSignal: {{ isEvenComputedSignal() }}</h2>
            <div class="space-x-4 my-2">
              <button
                class="px-4 py-2 bg-blue-500 text-white"
                type="button"
                (click)="increment()"
              >
                +
              </button>
              <button
                class="px-4 py-2 bg-blue-500 text-white"
                type="button"
                (click)="decrement()"
              >
                -
              </button>
            </div>
            <p>
              Is Signal value EVEN?:
              {{ isEvenComputedSignal() == 0 ? "even" : "odd" }}
            </p>
          </div>
        </div>
      </article>
    </section>
  `,
  styles: [],
})
export class HomeComponent {
  title = "hello";
  qtySignal = signal(0);
  isEvenComputedSignal = computed(() => this.qtySignal() % 2);

  constructor() {
    console.log("constructor");
  }

  ngOnInit(): void {
    console.log("ngOnInit");
  }

  qtyEffectRef = effect(() => {
    console.log("[qtyEffectRef] isEvenSignal: ", this.isEvenComputedSignal());
  });

  increment() {
    this.qtySignal.update((val) => val + 1);
  }

  decrement() {
    this.qtySignal.update((val) => val - 1);
  }

  ngOnDestroy() {
    console.log("ngOnDestroy");
    this.qtyEffectRef.destroy();
  }
}
