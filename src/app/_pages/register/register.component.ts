import { afterNextRender, Component, inject, OnDestroy } from "@angular/core";
import { NgClass } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "@app/_services";
import { Subscription } from "rxjs";
import {
  CheckUsernameExistsAsyncValidator,
  passwordMatchValidator,
} from "@app/_shared/_validators";
import { InputFocusDirective } from "@app/_shared/_directives";
import { WINDOW } from "@app/_shared/_models";

@Component({
  selector: "app-register",
  imports: [ReactiveFormsModule, NgClass, InputFocusDirective],
  template: `
    <section class="register bg-gray-50 dark:bg-gray-900">
      <div
        class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
      >
        <div
          class="cursor-pointer flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          Register
        </div>
        <div
          class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
        >
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1
              data-cy="title"
              class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
            >
              Sign up to your account
            </h1>
            <form
              class="space-y-4 md:space-y-6"
              [formGroup]="form"
              (ngSubmit)="handleSubmit()"
              novalidate
            >
              <div>
                <label
                  for="username"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Your username</label
                >
                <input
                  appInputFocus
                  formControlName="username"
                  [ngClass]="{
                    'is-invalid':
                      username?.invalid &&
                      (username?.dirty || username?.touched)
                  }"
                  type="text"
                  name="username"
                  id="username"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter username"
                  required
                />
                @if ( username?.invalid && (username?.dirty ||
                username?.touched) ) {
                <div>
                  <p
                    class="mt-2 text-sm font-light text-red-500 dark:text-red-400"
                  >
                    @if (username?.errors?.['required']) {
                    <span>username is required</span>
                    } @if (username?.errors?.['usernameExists']) {
                    <span>username already exists</span>
                    }
                  </p>
                </div>
                }
              </div>

              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Password</label
                >
                <input
                  formControlName="password"
                  [ngClass]="{
                    'is-invalid':
                      password?.invalid &&
                      (password?.dirty || password?.touched)
                  }"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
                @if ( password?.invalid && (password?.dirty ||
                password?.touched) ) {
                <div>
                  <p
                    class="mt-2 text-sm font-light text-red-500 dark:text-red-400"
                  >
                    @if (password?.errors?.['required']) {
                    <span>password is required</span>
                    }
                  </p>
                </div>
                }
              </div>

              <div>
                <label
                  for="confirm-password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Confirm Password</label
                >
                <input
                  formControlName="confirmPassword"
                  [ngClass]="{
                    'is-invalid':
                      confirmPassword?.invalid &&
                      (confirmPassword?.dirty || confirmPassword?.touched)
                  }"
                  type="password"
                  name="confirmPassword"
                  id="confirm-password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
                @if ( confirmPassword?.invalid && (confirmPassword?.dirty ||
                confirmPassword?.touched) ) {
                <div>
                  <p
                    class="mt-2 text-sm font-light text-red-500 dark:text-red-400"
                  >
                    @if (confirmPassword?.errors?.['required']) {
                    <span>password is required</span>
                    }
                  </p>
                </div>
                } @if (form.errors?.['passwordMismatch'] && (form.dirty ||
                form.touched)) {
                <div>
                  <p
                    class="mt-2 text-sm font-light text-red-500 dark:text-red-400"
                  >
                    <span>passwords don't match</span>
                  </p>
                </div>
                }
              </div>

              <button
                data-cy="register-btn"
                [disabled]="form.invalid || isFormSubmitted"
                type="submit"
                [ngClass]="{
                  'cursor-not-allowed': form.invalid || isFormSubmitted
                }"
                class="submit w-full inline-flex justify-center items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150"
              >
                <svg
                  [class.hidden]="!isFormSubmitted"
                  class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {{ isFormSubmitted ? "Processing..." : "Submit" }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [],
})
export class RegisterComponent implements OnDestroy {
  form!: FormGroup;
  isFormSubmitted = false;
  sub$!: Subscription;
  timer: number = 0;
  private fb: FormBuilder = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);
  private window = inject(WINDOW);
  private checkUsernameExistsAsyncValidator = inject(
    CheckUsernameExistsAsyncValidator
  );
  private router: Router = inject(Router);

  constructor() {
    afterNextRender(() => {
      if (this.authService.getAuthUser()) {
        this.router.navigate(["/"]);
      }
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group(
      {
        username: [
          "liamg",
          [Validators.required],
          [
            this.checkUsernameExistsAsyncValidator.validate.bind(
              this.checkUsernameExistsAsyncValidator
            ),
          ],
        ],

        password: ["0lelplR", [Validators.required]],
        confirmPassword: ["0lelplR", [Validators.required]],
      },
      {
        updateOn: "blur",
        validators: passwordMatchValidator,
      }
    );
  }

  get username() {
    return this.form.get("username");
  }

  get password() {
    return this.form.get("password");
  }

  get confirmPassword() {
    return this.form.get("confirmPassword");
  }

  handleSubmit() {
    // Set flag to true
    this.isFormSubmitted = true;

    // Return if form is invalid
    if (this.form?.invalid) {
      this.isFormSubmitted = false;
      return;
    }

    // Form field values
    console.log(this.form?.value);

    this.timer = this.window.setTimeout(() => {
      this.isFormSubmitted = false;
      alert(JSON.stringify(this.form.value));
    }, 1500);
  }

  canDeactivate() {
    const pristine = this.form.pristine;
    console.log("pristine", pristine);
    return pristine;
  }

  ngOnDestroy() {
    if (this.sub$) {
      clearTimeout(this.timer);
      this.sub$.unsubscribe();
    }
  }
}
