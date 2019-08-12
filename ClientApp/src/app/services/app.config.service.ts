import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { IAppConfig } from "../models/app-config.model";
@Injectable({
  providedIn: "root"
})
export class AppConfig {
  static settings: IAppConfig;
  constructor(private http: HttpClient) {}
  loadSettings() {
    const jsonFile = `assets/config/errors.json`;
    return new Promise<void>((resolve, reject) => {
      this.http
        .get(jsonFile)
        .toPromise()
        .then((response: IAppConfig) => {
          AppConfig.settings = <IAppConfig>response;
          resolve();
        })
        .catch((response: any) => {
          reject(
            `Could not load file '${jsonFile}': ${JSON.stringify(response)}`
          );
        });
    });
  }
  loadErrorMessages() {
    const jsonFile = `assets/config/errors.json`;
    return new Promise<void>((resolve, reject) => {
      this.http
        .get(jsonFile)
        .toPromise()
        .then((response: IAppConfig) => {
          AppConfig.settings = <IAppConfig>response;
          resolve();
        })
        .catch((response: any) => {
          reject(
            `Could not load file '${jsonFile}': ${JSON.stringify(response)}`
          );
        });
    });
  }
}
