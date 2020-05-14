import { NgModule } from '@angular/core';
import { NotificationListComponent } from "./notification-list";
import { NotificationWidgetComponent } from "./notification-widget";
import { NotificationWidgetService } from "./notification-widget.service";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FlyoutModule } from "@acpaas-ui/ngx-flyout";

@NgModule({
  declarations: [NotificationWidgetComponent, NotificationListComponent],
  imports: [
    CommonModule,
    RouterModule,
    FlyoutModule
  ],
  providers: [NotificationWidgetService],
  exports: [NotificationWidgetComponent, NotificationListComponent]
})
export class NotificationWidgetModule {
}
