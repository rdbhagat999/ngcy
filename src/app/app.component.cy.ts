import { HttpClient, HttpClientModule } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { mount } from "cypress/angular";
import { AppComponent } from "./app.component";
import { AuthService } from "./_services";
import { BACKEND_URL } from "./_shared/_models";

describe("AppComponent", () => {
  it("mounts", () => {
    mount(AppComponent, {
      imports: [
        HttpClientModule,
        RouterModule,
        NoopAnimationsModule,
        AppComponent,
      ],
      providers: [BACKEND_URL, AuthService],
    });
  });
});
