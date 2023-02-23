import { inject, Injectable, OnDestroy } from "@angular/core";
import { WINDOW } from "@app/_shared/_models";
import { BehaviorSubject } from "rxjs";
import { Toastr, ToastrOptions, ToastrType } from "./toastr";

@Injectable({
  providedIn: "root",
})
export class ToastrService implements OnDestroy {
  private window = inject(WINDOW);
  private toastrSubject = new BehaviorSubject<Toastr[]>([]);
  private timeoutId!: number;

  // enable subscribing to Toastrs observable
  toastrSubject$ = this.toastrSubject.asObservable();

  private addToastrSubject(toastr: Toastr): void {
    this.toastrSubject.next([toastr]);
  }

  private newToastr(
    title: string,
    message: string,
    type: ToastrType,
    options?: ToastrOptions
  ): Toastr {
    const toastrOptions = options
      ? options
      : { autoClose: true, keepAfterRouteChange: true };
    const toastr = new Toastr({
      ...toastrOptions,
      type,
      title,
      message,
      id: new Date().getTime().toString(),
    });

    this.addToastrSubject(toastr);

    return toastr;
  }

  // convenience methods
  successToastr(
    title: string,
    message: string,
    options?: ToastrOptions
  ): Toastr {
    const toastr = this.newToastr(title, message, ToastrType.Success, options);
    return toastr;
  }

  warnToastr(title: string, message: string, options?: ToastrOptions): Toastr {
    const toastr = this.newToastr(title, message, ToastrType.Warning, options);
    return toastr;
  }

  errorToastr(title: string, message: string, options?: ToastrOptions): Toastr {
    const toastr = this.newToastr(title, message, ToastrType.Error, options);
    return toastr;
  }

  infoToastr(title: string, message: string, options?: ToastrOptions): Toastr {
    const toastr = this.newToastr(title, message, ToastrType.Info, options);
    return toastr;
  }

  autoCloseToastr(): void {
    this.toastrSubject.value.forEach((toastr) => {
      if (toastr.autoClose) {
        this.timeoutId = this.window.setTimeout(() => {
          this.removeToastr(toastr);
        }, 3000);
      }
    });
  }

  removeToastr(toastr: Toastr): void {
    const toastrs = this.toastrSubject.value.filter((t) => t.id != toastr.id);
    this.toastrSubject.next(toastrs);
  }

  // clear Toastrs
  clear(): void {
    this.toastrSubject.next([]);
  }

  ngOnDestroy(): void {
    // unsubscribe to avoid memory leaks
    clearTimeout(this.timeoutId);
  }
}
