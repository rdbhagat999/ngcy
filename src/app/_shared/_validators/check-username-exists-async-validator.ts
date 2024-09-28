import { inject, Injectable } from "@angular/core";
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from "@angular/forms";
import { AuthService } from "@app/_services";
import { catchError, map, Observable, of } from "rxjs";

@Injectable({ providedIn: "root" })
export class CheckUsernameExistsAsyncValidator implements AsyncValidator {
  authService = inject(AuthService);

  validate(
    control: AbstractControl<any, any>
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.authService.checkUsername(control.value).pipe(
      map((isTaken) => (isTaken ? { usernameExists: true } : null)),
      catchError(() => of(null))
    );
  }
}
