import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { IPost, IPostAPIResponse } from "@app/_shared/_models";
import { BACKEND_API } from "@app/_shared/_models/BackendUrl";
import { Observable, map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PostService {
  private _http = inject(HttpClient);
  private _backend_url = inject(BACKEND_API);

  constructor() {}

  getPosts(page: number = 0, limit: number = 5): Observable<IPostAPIResponse> {
    const skip = page * limit;

    console.log(page, skip, limit);

    return this._http.get<IPostAPIResponse>(
      `${this._backend_url}/auth/posts?skip=${skip}&limit=${limit}`,
      {
        reportProgress: false,
      }
    );
  }

  getAllPostsByUserId(userId: number): Observable<IPostAPIResponse> {
    return this._http.get<IPostAPIResponse>(
      `${this._backend_url}/auth/posts/user/${userId}`,
      {
        reportProgress: false,
      }
    );
  }

  getPostById(postId: number): Observable<IPost> {
    return this._http.get<IPost>(`${this._backend_url}/auth/posts/${postId}`, {
      reportProgress: false,
    });
  }
}
