import { Component, OnInit } from "@angular/core";
import { BsDatepickerConfig } from "ngx-bootstrap/datepicker";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { CustomValidatorService } from "../services/custom-validator.service";
import { AppConfig } from "../services/app.config.service";
import { TrainingInfoModel } from "../models/training.model";
import { DataService } from "../services/data.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  readonly FromDateLabel = "From date";
  readonly ToDateLabel = "To date";

  // Calendar Icon
  faCalendar = faCalendar;
  // date picker configuration
  bsConfig: Partial<BsDatepickerConfig>;

  formGrp: FormGroup;

  succeded: boolean = false;
  failed: boolean = false;
  difference: number = 0;
  readonly RequiredMessage = AppConfig.settings.errorMessages.filedIsRequired;
  readonly DateFormatMessage =
    AppConfig.settings.errorMessages.dateFormatIsWrong;
  readonly MinLenth5RequiredMessage =
    AppConfig.settings.errorMessages.minLenthMustBe5Char;
  readonly FromDateGreaterThanToDate =
    AppConfig.settings.errorMessages.fromDateIsGreaterThanToDate;

  constructor(
    private fb: FormBuilder,
    private customeValidationService: CustomValidatorService,
    private dataservice: DataService
  ) {
    let dt = new Date();

    this.bsConfig = Object.assign(
      {},
      { dateInputFormat: "DD/MM/YYYY", containerClass: "theme-blue" }
    );
    this.createForm();
  }
  createForm() {
    this.formGrp = this.fb.group(
      {
        fromDate: new FormControl(null, [
          Validators.required,
          this.customeValidationService.validateDate
        ]),
        toDate: new FormControl(null, [
          Validators.required,
          this.customeValidationService.validateDate
        ]),
        trainingName: new FormControl("", Validators.required)
      },
      { validator: this.dateLessThan("fromDate", "toDate") }
    );
  }
  dateLessThan(from: string, to: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let fromCntrl = group.controls[from];
      let todtCntrl = group.controls[to];
      let fromdt: Date;
      let todt: Date;
      if (fromCntrl.value) {
        fromdt = this.modelToDate(fromCntrl.value);
      }
      if (todtCntrl.value) {
        todt = this.modelToDate(todtCntrl.value);
      }
      if (fromdt > todt) {
        return {
          dates: this.FromDateGreaterThanToDate
        };
      }
      return {};
    };
  }
  modelToDate(model: any): Date {
    let date: Date;
    if (model) {
      try {
        date = new Date(model.year, model.month - 1, model.day, 0, 0, 0, 0);
      } catch (error) {}
    }
    return date;
  }
  get fromDate() {
    return this.formGrp.get("fromDate");
  }
  get toDate() {
    return this.formGrp.get("toDate");
  }
  get trainingName() {
    return this.formGrp.get("trainingName");
  }
  ngOnInit() {}
  submit() {
    this.succeded = false;
    this.failed = false;

    if (this.formGrp.valid) {
      let newTraining = new TrainingInfoModel();
      newTraining.trainingName = this.trainingName.value;
      newTraining.fromDate = this.modelToDate(this.fromDate.value);
      newTraining.toDate = this.modelToDate(this.toDate.value);
      this.dataservice
        .addTraining(newTraining)
        .then(resp => {
          this.difference = resp;
          this.succeded = true;
          this.formGrp.reset();
          setTimeout(() => {
            this.succeded = false;
          }, 2000);
        })
        .catch(error => {
          this.failed = true;
          setTimeout(() => {
            this.failed = false;
          }, 2000);
        });
    }
  }

  get getWarningToshow() {
    return this.succeded || this.failed;
  }
}
