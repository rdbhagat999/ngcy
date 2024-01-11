import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { IDummyAuthUser } from "@app/_shared/_models";
import { Router, NavigationEnd, RouterModule } from "@angular/router";
import { LifeCycleDirective } from "@app/_shared/_directives";
import { takeUntil, filter, tap } from "rxjs";

@Component({
  selector: "app-toggle-dropdown",
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage],
  hostDirectives: [LifeCycleDirective],
  template: `
    <div *ngIf="auth_user">
      <button
        data-cy="toggle-dropdown"
        (click)="handleToggleDropdown()"
        type="button"
        class="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
        id="user-menu-button"
        aria-expanded="false"
        aria-haspopup="true">
        <span class="sr-only">Open user menu</span>
        <img
          class="h-8 w-8 rounded-full"
          [ngSrc]="avatarURL"
          width="32" 
          height="32"
          alt="avatar" />
      </button>
    </div>
  `,
  styles: [],
})
export class ToggleDropdownComponent implements OnInit {
  private router: Router = inject(Router);
  private lifeCycleDirective = inject(LifeCycleDirective);
  @Input() isDropdownOpen = false;
  @Input() auth_user!: IDummyAuthUser | null;
  @Output() toggleDropdown = new EventEmitter<boolean>();
  avatarURL = ''

  constructor() {
    this.avatarURL = window.location.href.includes('localhost') ? "assets/navbar_avatar.avif" : "/ngcy/assets/navbar_avatar.avif"
  }

  ngOnInit() {
    this.router.events
      .pipe(
        takeUntil(this.lifeCycleDirective.destroy$),
        filter((event) => event instanceof NavigationEnd),
        tap(() => (this.isDropdownOpen = false))
      )
      .subscribe();
  }

  handleToggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    this.toggleDropdown.emit(this.isDropdownOpen);
  }
}
