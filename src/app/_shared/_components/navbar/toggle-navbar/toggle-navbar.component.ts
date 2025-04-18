import { NgClass } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  output,
} from "@angular/core";
import { IDummyAuthUser } from "@app/_shared/_models";

@Component({
  selector: "app-toggle-navbar",
  imports: [NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Mobile menu button-->
    <button
      (click)="toggleMobileMenu()"
      type="button"
      class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
      aria-controls="mobile-menu"
      aria-expanded="false"
    >
      <span class="sr-only">Open main menu</span>
      <!--
          Icon when menu is closed.

          Menu open: "hidden", Menu closed: "block"
        -->
      <svg
        [ngClass]="{
          hidden: isMobileMenuOpen(),
          block: !isMobileMenuOpen()
        }"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
      <!--
          Icon when menu is open.

          Menu open: "block", Menu closed: "hidden"
        -->
      <svg
        [ngClass]="{
          block: isMobileMenuOpen(),
          hidden: !isMobileMenuOpen()
        }"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  `,
  styles: [],
})
export class ToggleNavbarComponent {
  isMobileMenuOpen = model(false);
  readonly auth_user = input.required<IDummyAuthUser | null>();
  readonly isMobileMenuOpenEvent = output<boolean>();

  toggleMobileMenu() {
    this.isMobileMenuOpen.update((prev) => !prev);
    this.isMobileMenuOpenEvent.emit(this.isMobileMenuOpen());
  }
}
