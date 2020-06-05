import { NgModule } from '@angular/core';
import { NotificationListComponent } from './notification-list';
import { NotificationWidgetComponent } from './notification-widget';
import { NotificationWidgetService } from './notification-widget.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlyoutModule } from '@acpaas-ui/ngx-flyout';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [NotificationWidgetComponent, NotificationListComponent],
  imports: [
    CommonModule,
    RouterModule,
    FlyoutModule,
    HttpClientModule
  ],
  providers: [NotificationWidgetService],
  exports: [NotificationWidgetComponent, NotificationListComponent]
})
export class NotificationWidgetModule {
}
