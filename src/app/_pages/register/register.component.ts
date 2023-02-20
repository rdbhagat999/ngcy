import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [ReactiveFormsModule],
  template: ` <p>register works!</p> `,
  styles: [],
})
export class RegisterComponent {}
