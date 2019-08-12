import { Component, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { TrainingInfoModel } from "../models/training.model";
import { DataService } from "../services/data.service";

@Component({
  selector: "app-fetch-data",
  templateUrl: "./fetch-data.component.html"
})
export class FetchDataComponent {
  public trainingInfo: TrainingInfoModel[];

  constructor(
    private dataService: DataService,
    @Inject("BASE_URL") baseUrl: string
  ) {
    this.dataService
      .getTrainingList()
      .then(data => {
        this.trainingInfo = data;
      })
      .catch(error => {
        alert("failed to get list");
      });
  }
}
