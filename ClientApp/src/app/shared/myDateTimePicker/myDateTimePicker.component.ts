import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { BsDatepickerConfig } from "ngx-bootstrap/datepicker";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-myDateTimePicker",
  templateUrl: "./myDateTimePicker.component.html",
  styleUrls: ["./myDateTimePicker.component.css"]
})
export class MyDateTimePickerComponent implements OnInit, OnChanges {
  @Input() configuration?: BsDatepickerConfig;
  @Input() value?: Date;
  @Input() dtPickerLabel?: string = "Select Date";
  @Input() isValid?: boolean = true;
  @Output() onValueChange?: EventEmitter<Date> = new EventEmitter<Date>();
  // Calendar Icon
  faCalendar = faCalendar;
  prevValue?: Date;
  // date picker configuration
  readonly bsConfig: Partial<BsDatepickerConfig>;
  dtpformgroup: FormGroup;
  constructor() {
    this.bsConfig = this.configuration;
    this.prevValue = this.value ? { ...this.value } : null;
    this.dtpformgroup = new FormGroup({
      dtpValue: new FormControl("", [
        Validators.required,
        Validators.pattern(
          "^(?:(?:10|12|0?[13578])/(?:3[01]|[12][0-9]|0?[1-9])/(?:1[8-9]\\d{2}|[2-9]\\d{3})|(?:11|0?[469])/(?:30|[12][0-9]|0?[1-9])/(?:1[8-9]\\d{2}|[2-9]\\d{3})|0?2/(?:2[0-8]|1[0-9]|0?[1-9])/(?:1[8-9]\\d{2}|[2-9]\\d{3})|0?2/29/[2468][048]00|0?2/29/[3579][26]00|0?2/29/[1][89][0][48]|0?2/29/[2-9][0-9][0][48]|0?2/29/1[89][2468][048]|0?2/29/[2-9][0-9][2468][048]|0?2/29/1[89][13579][26]|0?2/29/[2-9][0-9][13579][26])$"
        )
      ])
    });
  }
  ngOnInit() {}
  onValChange(value: Date): void {
    if (value.getDate()) {
      this.value = new Date(value.toUTCString());
      // this.prevValue = new Date(value.toUTCString());
    }
    this.setControlValidation();
    // else {
    //   console.log("value", value);
    //   this.prevValue = new Date(this.value.toUTCString());
    // }
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }
  onHidden(controlName: string) {
    this.setControlValidation();
  }
  forceValidation(controlName: string) {
    this.setControlValidation();
  }
  setControlValidation() {
    const control = this.dtpformgroup.get("dtpValue");
    control.markAsDirty();
    control.updateValueAndValidity();
    console.log(control.valid);
  }
}
