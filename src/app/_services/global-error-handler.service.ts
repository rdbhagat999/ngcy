import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandler, inject, Injectable } from "@angular/core";
import { ToastrService } from "@app/toastr";

@Injectable({
  providedIn: "root",
})
export class GlobalErrorHandlerService implements ErrorHandler {
  // for client-side errors
  private toastrService: ToastrService = inject(ToastrService);

  constructor() {}

  showError(message: string) {
    console.log(`Error: ${message}`);
    this.toastrService.errorToastr("Error", message);
  }

  handleError(err: any): void {
    console.log("GlobalErrorHandlerService");

    if (err instanceof HttpErrorResponse) {
      console.log("HttpErrorResponse");
      console.log(err.status, err.error.message);
    } else {
      console.log("NOT HttpErrorResponse");
      this.showError(err.message);
    }
  }
}
