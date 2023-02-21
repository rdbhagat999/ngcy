import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { RegisterComponent } from "@app/_pages";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RegisterDeactivateGuard
  implements CanDeactivate<RegisterComponent>
{
  canDeactivate(
    component: RegisterComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return component.canDeactivate() || confirm("Are you sure?");
  }
}
