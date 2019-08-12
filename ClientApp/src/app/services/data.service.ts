import { Injectable, Inject } from "@angular/core";
import { FormControl } from "@angular/forms";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { ITrainingInfo, TrainingInfoModel } from "../models/training.model";
import { Observable, throwError } from "rxjs";
@Injectable()
export class DataService {
  private baseUrl: string;
  constructor(private http: HttpClient, @Inject("BASE_URL") baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  public async addTraining(traningInfo: TrainingInfoModel): Promise<any> {
    const methodName = "Training";
    let tz = traningInfo.fromDate.getTimezoneOffset();
    traningInfo.fromDate.setMinutes(traningInfo.fromDate.getMinutes() - tz);
    traningInfo.toDate.setMinutes(traningInfo.toDate.getMinutes() - tz);
    return await this.post<TrainingInfoModel>(methodName, traningInfo);
  }
  public async getTrainingList(): Promise<any> {
    const methodName = "Training";
    return await this.get<TrainingInfoModel>(methodName);
  }
  public async get<T>(methodName: string) {
    return this.http
      .get<T[]>(`${this.baseUrl}api/v1.0/${methodName}`)
      .toPromise()
      .then(response => response as T[])
      .catch(this.handleError);
  }
  public async post<T>(methodName: string, params: T): Promise<any> {
    const headers = new HttpHeaders().set("content-type", "application/json");
    var body = JSON.stringify(params);
    return await this.http
      .post<T>(`${this.baseUrl}api/v1.0/${methodName}`, body, { headers })
      .toPromise()
      .then(response => response as T)
      .catch(this.handleError);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError("Something bad happened; please try again later.");
  }
}
