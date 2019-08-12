import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-errorTemplate",
  templateUrl: "./errorTemplate.component.html",
  styleUrls: ["./errorTemplate.component.css"]
})
export class ErrorTemplateComponent implements OnInit {
  @Input() message: string;
  @Input() show: boolean = false;

  constructor() {}
  ngOnInit() {}
}
