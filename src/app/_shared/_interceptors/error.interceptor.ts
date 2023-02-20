import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { ToastrService } from "@app/toastr";
import { AuthService } from "@app/_services";
import { catchError, throwError } from "rxjs";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  console.log("errorInterceptor", req.method, req.url);
  const toastrService: ToastrService = inject(ToastrService);
  const authService = inject(AuthService);

  function showError(message: string) {
    console.log(`Error: ${message}`);
    toastrService.errorToastr("Error", message);
  }

  return next(req).pipe(
    catchError((err: HttpErrorResponse | Error) => {
      if (err instanceof HttpErrorResponse) {
        console.log("Server-side error");
        if ([401, 403].includes(err.status)) {
          showError(err.error.message);
          // auto logout if 401 or 403 response returned from api
          authService.logoutFromDummyJson();
        } else if (err.status == 0) {
          console.log(err.status);
          if (!window.navigator.onLine) {
            showError("Please check your internet connection.");
          }
        } else if (err.status == 404) {
          showError("Not found");
        } else {
          console.log(err);
          showError(err.error.message);
        }
      } else {
        console.log("Client-side error");
      }
      return throwError(() => err);
    })
  );
};
