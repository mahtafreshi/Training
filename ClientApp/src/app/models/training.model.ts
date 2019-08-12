export class ITrainingInfo {
  trainingName: string;
  fromDate: Date;
  toDate: Date;
  difference: number;
  id: number;
}
export class TrainingInfoModel {
  trainingName: string = "";
  fromDate: Date;
  toDate: Date;
  difference: number = 0;
  id: number;
  constructor() {}
}
