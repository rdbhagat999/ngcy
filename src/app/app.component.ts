import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from "@angular/core";
import { RouterModule } from "@angular/router";
import { HeaderComponent } from "@app/_shared/_components";
import { NavbarComponent } from "./_shared/_components/navbar/navbar.component";
import { ToastrComponent } from "./toastr/toastr.component";
import { AuthService } from "./_services";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterModule, NavbarComponent, HeaderComponent, ToastrComponent],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [],
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <app-navbar></app-navbar>
    <app-header></app-header>
    <app-toastr></app-toastr>

    <main>
      <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <!-- Replace with your content -->
        <div class="px-4 py-6 sm:px-0">
          <div class="rounded-lg border-4 border-dashed border-gray-200">
            <router-outlet></router-outlet>
          </div>
        </div>
        <!-- /End replace -->
      </div>
    </main>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  private authService: AuthService = inject(AuthService);

  ngOnInit() {
    this.authService.setAuthUserFromStorage();
  }
}
