import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { ErrorHandler, importProvidersFrom } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { provideState, provideStore } from "@ngrx/store";
import { provideEffects } from "@ngrx/effects";

import { APP_ROUTES } from "@app/app-routes";
import { AppComponent } from "@app/app.component";
import { ToastrService } from "@app/toastr";
import { AuthService, GlobalErrorHandlerService } from "@app/_services";
import {
  authInterceptor,
  cacheInterceptor,
  errorInterceptor,
} from "@app/_shared/_interceptors";

import { BACKEND_API } from "@app/_shared/_models/BackendUrl";
import { counterReducer } from "@app/state/counter/counter.reducer";
import { productReducer } from "@app/state/product/product.reducer";
import { ProductEffects } from "@app/state/product/product.effects";
import { postReducer } from "@app/state/post/post.reducer";
import { PostEffects } from "@app/state/post/post.effects";
import { counterFeatureKey } from "@app/state/counter/counter.selectors";
import { postFeatureKey } from "@app/state/post/post.state";
import { productFeatureKey } from "@app/state/product/product.state";

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom([BrowserAnimationsModule]),

    provideStore(),
    provideState(counterFeatureKey, counterReducer),
    provideState(productFeatureKey, productReducer),
    provideState(postFeatureKey, postReducer),
    provideEffects([ProductEffects, PostEffects]),

    { provide: BACKEND_API, useValue: "https://dummyjson.com" },
    { provide: ToastrService, useClass: ToastrService },
    { provide: AuthService, useClass: AuthService },
    provideHttpClient(
      withInterceptors([errorInterceptor, authInterceptor, cacheInterceptor])
    ),
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
    provideRouter([...APP_ROUTES]),
  ],
});
