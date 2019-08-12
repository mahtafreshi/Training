import { Injectable } from "@angular/core";
import { FormControl } from "@angular/forms";
import { moment } from "ngx-bootstrap/chronos/test/chain";

@Injectable()
export class CustomValidatorService {
  constructor() {}
  public validateDate(control: FormControl) {
    if (control.value && control.value.year) {
      return null;
    } else {
      return { validateDate: false };
    }
  }
}
