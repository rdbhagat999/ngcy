import {
  afterNextRender,
  Component,
  inject,
  OnInit,
  input,
  output,
  model,
} from "@angular/core";
import { NgOptimizedImage } from "@angular/common";
import { IDummyAuthUser } from "@app/_shared/_models";
import { Router, NavigationEnd, RouterModule } from "@angular/router";
import { LifeCycleDirective } from "@app/_shared/_directives";
import { takeUntil, filter, tap } from "rxjs";

@Component({
  selector: "app-toggle-dropdown",
  imports: [RouterModule, NgOptimizedImage],
  hostDirectives: [LifeCycleDirective],
  template: `
    @if (auth_user()) {
    <div>
      <button
        data-cy="toggle-dropdown"
        (click)="handleToggleDropdown()"
        type="button"
        class="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
        id="user-menu-button"
        aria-expanded="false"
        aria-haspopup="true"
      >
        <span class="sr-only">Open user menu</span>
        @if (avatarURL) {
        <img
          class="h-8 w-8 rounded-full"
          [ngSrc]="avatarURL"
          width="32"
          height="32"
          alt="avatar"
          priority
        />
        }
      </button>
    </div>
    }
  `,
  styles: [],
})
export class ToggleDropdownComponent implements OnInit {
  private router: Router = inject(Router);
  private lifeCycleDirective = inject(LifeCycleDirective);
  readonly isDropdownOpen = model(false);
  readonly auth_user = input.required<IDummyAuthUser | null>();
  readonly toggleDropdown = output<boolean>();
  avatarURL = "";

  constructor() {
    afterNextRender(() => {
      this.avatarURL = window.location.href.includes("localhost")
        ? "assets/navbar_avatar.avif"
        : "/assets/navbar_avatar.avif";
    });
  }

  ngOnInit() {
    this.router.events
      .pipe(
        takeUntil(this.lifeCycleDirective.destroy$),
        filter((event) => event instanceof NavigationEnd),
        tap(() => this.isDropdownOpen.set(false))
      )
      .subscribe();
  }

  handleToggleDropdown() {
    this.isDropdownOpen.update((prev) => !prev);
    this.toggleDropdown.emit(this.isDropdownOpen());
  }
}
