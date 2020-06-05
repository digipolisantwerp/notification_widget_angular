import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NotificationWidgetModule } from '../../../notification-widget/src/lib/notification-widget.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot([]),
    BrowserModule,
    NotificationWidgetModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
