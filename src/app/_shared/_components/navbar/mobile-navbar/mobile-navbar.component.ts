import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";
import { NgClass } from "@angular/common";
import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { RouterModule } from "@angular/router";
import { IDummyAuthUser } from "@app/_shared/_models";

@Component({
    selector: "app-mobile-navbar",
    imports: [NgClass, RouterModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger("openCloseMobileMenu", [
            state("closed", style({
                opacity: 0,
                transform: "scale(0.95, 0.95)",
            })),
            state("open", style({
                opacity: 1,
                transform: "scale(1, 1)",
            })),
            transition("closed => open", [animate("100ms ease-out")]),
            transition("open => closed", [animate("75ms ease-in")]),
        ]),
    ],
    template: `
    <!-- Mobile menu, show/hide based on menu state. -->
    <div
      [@openCloseMobileMenu]="openCloseMobileMenuTrigger"
      [ngClass]="{ block: isMobileMenuOpen(), hidden: !isMobileMenuOpen() }"
      class="sm:hidden"
      id="mobile-menu"
    >
      <div class="space-y-1 px-2 pt-2 pb-3">
        <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
        @for (link of navLinks(); track $index) {
        <a
          [attr.data-cy]="link?.label"
          [routerLink]="link?.path"
          routerLinkActive="bg-gray-900 text-white"
          [routerLinkActiveOptions]="{ exact: true }"
          class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          aria-current="page"
          >{{ link?.label }}</a
        >
        } @if (!auth_user()) {
        <a
          data-cy="login"
          routerLink="/login"
          routerLinkActive="bg-gray-900 text-white"
          [routerLinkActiveOptions]="{ exact: true }"
          class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          aria-current="page"
          >Login</a
        >
        <a
          data-cy="register"
          routerLink="/register"
          routerLinkActive="bg-gray-900 text-white"
          [routerLinkActiveOptions]="{ exact: true }"
          class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          aria-current="page"
          >Register</a
        >
        }
      </div>
    </div>
  `,
    styles: []
})
export class MobileNavbarComponent {
  navLinks = input.required<any[]>();
  auth_user = input.required<IDummyAuthUser | null>();
  isMobileMenuOpen = input.required<Boolean>();

  get openCloseMobileMenuTrigger() {
    return this.isMobileMenuOpen() ? "open" : "closed";
  }
}
