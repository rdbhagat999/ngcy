import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "app-header",
    imports: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <header class="bg-white shadow">
      <div class="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
        <h1
          data-cy="title"
          class="text-3xl font-bold tracking-tight text-gray-900"
        >
          {{ title }}
        </h1>
      </div>
    </header>
  `,
    styles: []
})
export class HeaderComponent {
  title = "Cypress, NGRX & Angular Standalone Components";
}
