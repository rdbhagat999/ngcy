import {
  ChangeDetectionStrategy,
  Component,
  input,
  Input,
} from "@angular/core";
import { RouterModule } from "@angular/router";
import { IDummyAuthUser } from "@app/_shared/_models";

@Component({
  selector: "app-desktop-navbar",
  standalone: true,
  imports: [RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex space-x-4">
      <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
      @for (link of navLinks(); track link.label) {
      <a
        [attr.data-cy]="link?.label"
        [routerLink]="link?.path"
        routerLinkActive="bg-gray-900 text-white"
        [routerLinkActiveOptions]="{ exact: true }"
        class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
        aria-current="page"
        >{{ link?.label }}</a
      >

      } @if (!auth_user()) {
      <a
        data-cy="login"
        routerLink="/login"
        routerLinkActive="bg-gray-900 text-white"
        [routerLinkActiveOptions]="{ exact: true }"
        class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
        aria-current="page"
        >Login</a
      >

      <a
        data-cy="register"
        routerLink="/register"
        routerLinkActive="bg-gray-900 text-white"
        [routerLinkActiveOptions]="{ exact: true }"
        class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
        aria-current="page"
        >Register</a
      >
      }
    </div>
  `,
  styles: [],
})
export class DesktopNavbarComponent {
  navLinks = input.required<any[]>();
  auth_user = input.required<IDummyAuthUser | null>();
}
