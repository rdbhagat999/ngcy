import { HttpClient } from "@angular/common/http";
import { Inject, inject, Injectable, PLATFORM_ID } from "@angular/core";
import { Router } from "@angular/router";
import { IDummyAuthUser, IDummyJsonUser } from "@app/_shared/_models";
import { BACKEND_API } from "@app/_shared/_models/BackendUrl";
import { Observable, of, BehaviorSubject } from "rxjs";
import { StorageService } from "./storage.service";
import { isPlatformBrowser } from "@angular/common";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private storageservice: StorageService = inject(StorageService);
  private _backend_url = inject(BACKEND_API);
  private auth_user = new BehaviorSubject<IDummyAuthUser | null>(null);

  auth_user$ = this.auth_user.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  setAuthUser(user: any): void {
    if (isPlatformBrowser(this.platformId)) {
      this.storageservice.saveUserToStorage(user);
      this.auth_user.next(user);
    }
  }

  getAuthUser(): IDummyAuthUser | null {
    if (isPlatformBrowser(this.platformId)) {
      const user = this.storageservice.getUserFromStorage();
      return user;
    }
    return null;
  }

  setAuthUserFromStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.auth_user.next(this.getAuthUser());
    }
  }

  loginToDummyJson(username: string, password: string) {
    return this.http.post<IDummyAuthUser>(`${this._backend_url}/auth/login`, {
      username,
      password,
    });
  }

  getProfileData(userId: number) {
    return this.http.get<IDummyJsonUser>(
      `${this._backend_url}/users/${userId}`
    );
  }

  checkUsername(username: string): Observable<boolean> {
    if (username === "liamg") {
      return of(true);
    }
    return of(false);
  }

  isTokenExpired(token: string): boolean {
    try {
      const expiry = JSON.parse(atob(token.split(".")[1])).exp;
      return expiry * 1000 > Date.now();
    } catch (error) {
      return true;
    }
  }

  logoutFromDummyJson() {
    this.setAuthUser(null);
    if (isPlatformBrowser(this.platformId)) {
      this.storageservice.clean();
    }
    this.router.navigateByUrl("/login");
  }
}
