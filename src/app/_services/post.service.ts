import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { IPost } from "@app/_shared/_models";
import { BACKEND_URL } from "@app/_shared/_models/BackendUrl";
import { Observable, map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PostService {
  private _http = inject(HttpClient);
  private _backend_url = inject(BACKEND_URL);

  constructor() {}

  getPosts(limit: number = 5): Observable<IPost[]> {
    return this._http
      .get(`${this._backend_url}/auth/posts?limit=${limit}`, {
        reportProgress: false,
      })
      .pipe(map((data: any) => data?.posts as IPost[]));
  }

  getPostById(postId: number): Observable<IPost> {
    return this._http.get<IPost>(`${this._backend_url}/auth/posts/${postId}`, {
      reportProgress: false,
    });
  }

  getAllPostsByUserId(userId: number): Observable<IPost[]> {
    return this._http
      .get(`${this._backend_url}/auth/posts/user/${userId}`, {
        reportProgress: false,
      })
      .pipe(map((data: any) => data?.posts as IPost[]));
  }
}
