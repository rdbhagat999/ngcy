import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { AsyncPipe, NgClass, NgForOf, NgIf } from "@angular/common";
import { Router, NavigationStart } from "@angular/router";
import { Observable, of, Subscription, tap } from "rxjs";
import { Toastr, ToastrType } from "./toastr";
import { ToastrService } from "./toastr.service";
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";

const classes = ["toastr", "toastr-dismissible"];

const toastrTypeClass = {
  [ToastrType.Success]: "bg-green-500 hover:bg-green-600",
  [ToastrType.Error]: "bg-red-500 hover:bg-red-600",
  [ToastrType.Info]: "bg-blue-500 hover:bg-blue-600",
  [ToastrType.Warning]: "bg-yellow-500 hover:bg-yellow-600",
};

@Component({
  selector: "app-toastr",
  standalone: true,
  imports: [NgForOf, AsyncPipe, NgClass, NgIf],
  animations: [
    trigger("showHideNotification", [
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
      transition("closed => open", [animate("2000ms ease-out")]),
      transition("open => closed", [animate("1000ms ease-in")]),
    ]),
  ],
  template: `
    <div
      *ngFor="let toastr of toastrs$ | async"
      [id]="toastr.id"
      class="w-full px-2 py-4 text-center sm:text-right overflow-x-auto whitespace-no-wrap rounded-md
      transition all"
      role="alert"
    >
      <div
        [ngClass]="cssClass(toastr)"
        class="relative inline-flex w-full max-w-sm overflow-hidden hover:shadow-lg"
      >
        <div class="flex items-center justify-center w-12">
          <svg
            class="w-10 h-10 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <div class="px-3 py-2 text-left">
          <!-- <p class="mb-1 text-sm leading-none text-white">
            {{ toastr.id }}
          </p> -->
          <span class="font-semibold text-white">{{ toastr.title }}</span>
          <p class="mb-1 text-sm leading-none text-white">
            {{ toastr.message }}
          </p>
        </div>
        <div class="absolute right-0 p-1" (click)="removeToastr(toastr)">
          <svg
            class="w-6 h-6 text-white fill-current"
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <title>Close</title>
            <path
              d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
            />
          </svg>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        position: absolute;
        width: 100%;
        z-index: 1;
      }
    `,
  ],
})
export class ToastrComponent implements OnInit, OnDestroy {
  private toastrService = inject(ToastrService);
  private router = inject(Router);
  toastrs$: Observable<Toastr[]> = of([]);

  private routeSubscription!: Subscription;

  ngOnInit() {
    this.toastrs$ = this.toastrService.toastrSubject$.pipe(
      tap((toastrs) => {
        this.toastrService.autoCloseToastr();
      })
    );

    // clear toastrs on location change
    this.routeSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.toastrService.autoCloseToastr();
      }
    });
  }

  removeToastr(toastr: Toastr) {
    // check if already removed to prevent error on auto close
    this.toastrService.removeToastr(toastr);
  }

  cssClass(toastr: Toastr) {
    if (!toastr) return;

    let applyClasses = [];

    if (toastr.type !== undefined) {
      applyClasses = [...classes, toastrTypeClass[toastr.type]];
    } else {
      applyClasses = [...classes, toastrTypeClass[ToastrType.Info]];
    }

    return applyClasses;
  }

  ngOnDestroy() {
    // unsubscribe to avoid memory leaks
    this.routeSubscription.unsubscribe();
  }
}
