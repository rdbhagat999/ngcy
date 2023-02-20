import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="home">
      <h3 class="text-lg font-medium leading-6 text-gray-900">Home page</h3>
    </section>
  `,
  styles: [],
})
export class HomeComponent {
  title = "hello";
}
