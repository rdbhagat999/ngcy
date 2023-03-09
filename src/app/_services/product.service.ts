import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

import {
  BACKEND_API,
  IProduct,
  IProductsAPIResponse,
} from "@app/_shared/_models";
import { Store } from "@ngrx/store";
import { Observable, map, tap, switchMap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private _http = inject(HttpClient);
  private _backend_url = inject(BACKEND_API);
  private store: Store<{ response: IProductsAPIResponse }> = inject(
    Store<{ response: IProductsAPIResponse }>
  );

  constructor() {}

  getProducts(
    page: number = 0,
    limit: number = 5
  ): Observable<IProductsAPIResponse> {
    const skip = page * limit;

    console.log(page, skip, limit);

    return this._http.get<IProductsAPIResponse>(
      `${this._backend_url}/auth/products?skip=${skip}&limit=${limit}`,
      {
        reportProgress: false,
      }
    );
  }

  getProductById(id: number): Observable<IProduct> {
    return this._http.get<IProduct>(
      `${this._backend_url}/auth/products/${id}`,
      {
        reportProgress: false,
      }
    );
  }
}
