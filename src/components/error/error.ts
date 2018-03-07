import { Component, Input } from '@angular/core';

@Component({
  selector: "fd-error",
  templateUrl: "error.html"
})
export class ErrorComponent {
  @Input("visible") visible: boolean;
  @Input("message") message: string;
}