import { BrowserModule } from "@angular/platform-browser";
import { NgModule, APP_INITIALIZER } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import {
  NgbModule,
  NgbAlertModule,
  NgbDatepickerModule
} from "@ng-bootstrap/ng-bootstrap";
//components
import { AppComponent } from "./app.component";
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { HelpComponent } from "./help/help.component";
import { RegisterComponent } from "./register/register.component";
import { BsDatepickerModule } from "ngx-bootstrap";
import { MyDateTimePickerComponent } from "./shared/myDateTimePicker/myDateTimePicker.component";
import { ErrorTemplateComponent } from "./shared/errorTemplate/errorTemplate.component";
import { FetchDataComponent } from "./fetch-data/fetch-data.component";
// services
import { CustomValidatorService } from "./services/custom-validator.service";
import { AppConfig } from "./services/app.config.service";
import { DataService } from "./services/data.service";

export function get_settings(appConfig: AppConfig) {
  return () => appConfig.loadErrorMessages();
}

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HelpComponent,
    RegisterComponent,
    MyDateTimePickerComponent,
    ErrorTemplateComponent,
    FetchDataComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    BsDatepickerModule.forRoot(),
    NgbAlertModule,
    NgbDatepickerModule,
    RouterModule.forRoot([
      { path: "", component: RegisterComponent, pathMatch: "full" },
      { path: "help", component: HelpComponent },
      { path: "fetch", component: FetchDataComponent }
    ])
  ],
  providers: [
    CustomValidatorService,
    DataService,
    AppConfig,
    {
      provide: APP_INITIALIZER,
      useFactory: get_settings,
      deps: [AppConfig],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
