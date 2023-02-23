import {
  AfterViewInit,
  Directive,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { WINDOW } from "../_models";

@Directive({
  selector: "[appInputFocus]",
  standalone: true,
})
export class InputFocusDirective implements OnInit, AfterViewInit, OnDestroy {
  private el: ElementRef = inject(ElementRef);
  private window = inject(WINDOW);
  private timer: number = 0;

  constructor() {}

  ngOnInit() {
    if (!this.el.nativeElement["focus"]) {
      console.log("Element does not accept focus.");
    }
  }

  ngAfterViewInit(): void {
    this.timer = this.window.setTimeout(() => {
      this.el.nativeElement.focus();
    }, 200);
  }

  ngOnDestroy(): void {
    clearTimeout(this.timer);
  }
}
