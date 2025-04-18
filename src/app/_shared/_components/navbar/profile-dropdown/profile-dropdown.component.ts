import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  output,
} from "@angular/core";

import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";
import { RouterModule } from "@angular/router";
import { IDummyAuthUser } from "@app/_shared/_models";
import { LifeCycleDirective } from "@app/_shared/_directives";

@Component({
  selector: "app-profile-dropdown",
  imports: [RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [LifeCycleDirective],
  animations: [
    trigger("openCloseDropdown", [
      state(
        "closed",
        style({
          opacity: 0,
          transform: "scale(0.95, 0.95)",
        })
      ),
      state(
        "open",
        style({
          opacity: 1,
          transform: "scale(1, 1)",
        })
      ),
      transition("closed => open", [animate("100ms ease-out")]),
      transition("open => closed", [animate("75ms ease-in")]),
    ]),
  ],
  template: `@if (auth_user()) {
    <div
      [@openCloseDropdown]="openCloseDropdownTrigger"
      class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="user-menu-button"
      tabindex="-1"
    >
      <!-- Active: "bg-gray-100", Not Active: "" -->
      <a
        data-cy="profile-link"
        [routerLink]="['/profile', auth_user()?.id]"
        (click)="navigateToUserProfile()"
        class="cursor-pointer inline-block px-4 py-2 text-sm text-gray-700"
        role="menuitem"
        tabindex="-1"
        id="user-menu-item-0"
        >Your Profile</a
      >
      <a
        data-cy="logout-link"
        routerLink="null"
        (click)="handleLogout()"
        class="block px-4 py-2 text-sm text-gray-700"
        role="menuitem"
        tabindex="-1"
        id="user-menu-item-2"
        >Sign out</a
      >
    </div>
    }`,
  styles: [],
})
export class ProfileDropdownComponent {
  // private router: Router = inject(Router);
  // private lifeCycleDirective = inject(LifeCycleDirective);
  readonly isDropdownOpen = model(false);
  readonly auth_user = input.required<IDummyAuthUser | null>();
  readonly logoutEvent = output<boolean>();
  readonly dropdownEvent = output<boolean>();

  ngOnInit() {
    // this.router.events
    //   .pipe(
    //     takeUntil(this.lifeCycleDirective.destroy$),
    //     filter((event) => event instanceof NavigationEnd),
    //     tap(() => this.handleDropdownEvent())
    //   )
    //   .subscribe();
  }

  get openCloseDropdownTrigger() {
    return this.isDropdownOpen() ? "open" : "closed";
  }

  navigateToUserProfile() {
    this.isDropdownOpen.set(false);
    // this.router.navigate(["/profile", this.auth_user?.id]);
  }

  handleDropdownEvent() {
    this.isDropdownOpen.set(false);
    this.dropdownEvent.emit(this.isDropdownOpen());
  }

  handleLogout() {
    this.isDropdownOpen.set(false);
    this.logoutEvent.emit(this.isDropdownOpen());
  }
}
