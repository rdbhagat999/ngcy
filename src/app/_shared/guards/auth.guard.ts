import { inject } from "@angular/core";
import { AuthService } from "@app/_services";
import { map } from "rxjs";

export const AuthGuard = () => {
  const authService = inject(AuthService);
  const isLoggedIn = authService.getAuthUser();

  return isLoggedIn ? true : authService.logoutFromDummyJson();
};
