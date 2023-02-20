import { Injectable } from "@angular/core";

const USER_KEY = "storage_user";

@Injectable({
  providedIn: "root",
})
export abstract class StorageService {
  constructor() {}

  public clean(): void {
    window.sessionStorage.clear();
  }

  public saveUserToStorage(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUserFromStorage() {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }
}
