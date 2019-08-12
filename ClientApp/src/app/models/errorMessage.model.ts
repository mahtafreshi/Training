export class IErrorMessage {
  filedIsRequired: string;
  dateFormatIsWrong: string;
  minLenthMustBe5Char: string;
  fromDateIsGreaterThanToDate: string;
}
export class ErrorMessageModel implements IErrorMessage {
  filedIsRequired: string = "This field is required";
  dateFormatIsWrong: string =
    "the entered date is not valid.Valid format is YYYY-MM-DD format.";
  minLenthMustBe5Char: string = "Please Enter at least 5 character.";
  fromDateIsGreaterThanToDate: string =
    "'From Date' value must be before 'To Date' value. ";

  constructor() {}
}
