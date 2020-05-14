import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NotificationWidgetModule } from "notification-widget";
import { HttpClientModule } from "@angular/common/http";
import { FlyoutModule } from "@acpaas-ui/ngx-flyout";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot([]),
    FlyoutModule,
    BrowserModule,
    HttpClientModule,
    NotificationWidgetModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
