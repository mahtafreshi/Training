import { Component } from "@angular/core";

@Component({
  selector: "app-help-component",
  templateUrl: "./help.component.html"
})
export class HelpComponent {
  public currentCount = 0;

  public incrementHelp() {
    this.currentCount++;
  }
}
