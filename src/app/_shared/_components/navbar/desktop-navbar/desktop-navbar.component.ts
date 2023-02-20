import { CommonModule, NgForOf } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { RouterModule } from "@angular/router";
import { IDummyAuthUser } from "@app/_shared/_models";

@Component({
  selector: "app-desktop-navbar",
  standalone: true,
  imports: [CommonModule, RouterModule, NgForOf],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex space-x-4">
      <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
      <a
        *ngFor="let link of navLinks"
        [routerLink]="link?.path"
        routerLinkActive="bg-gray-900 text-white"
        [routerLinkActiveOptions]="{ exact: true }"
        class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
        aria-current="page"
        >{{ link?.label }}</a
      >

      <ng-container *ngIf="!auth_user">
        <a
          routerLink="/login"
          routerLinkActive="bg-gray-900 text-white"
          [routerLinkActiveOptions]="{ exact: true }"
          class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          aria-current="page"
          >Login</a
        >

        <a
          routerLink="/register"
          routerLinkActive="bg-gray-900 text-white"
          [routerLinkActiveOptions]="{ exact: true }"
          class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          aria-current="page"
          >Register</a
        >
      </ng-container>
    </div>
  `,
  styles: [],
})
export class DesktopNavbarComponent {
  @Input() navLinks: any = [];
  @Input() auth_user!: IDummyAuthUser | null;
}
