import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotificationWidgetService } from '../notification-widget.service';
import { FlyoutSize } from '@acpaas-ui/ngx-flyout';

@Component({
  selector: 'app-notification-list',
  styleUrls: ['./notification-list.component.scss'],
  templateUrl: './notification-list.component.html',

})
export class NotificationListComponent implements OnInit {

  @Input() url:String;
  @Input() notifications;
  @Input() notificationsCount;
  @Input() isLoading;
  @Input() isLoadingExtraNotifications;
  @Input() currentPage;
  @Input() totalPages;
  @Output() updateNotificationCount = new EventEmitter<boolean>();
  @Output() loadNotificationsFromPage = new EventEmitter<boolean>();

  public sizes = FlyoutSize;


  constructor(
    private notificationService: NotificationWidgetService) {
  }

  ngOnInit() {
  }

  public setInAppMessageStatus(message) {
    const data = {status: 'read'};
    if (message.status === 'read') {
      data.status = 'unread';
      this.notificationsCount += 1;
    } else {
      this.notificationsCount -= 1;
    }
    this.notificationService.updateInAppMessageStatus(this.url, message.id, data).subscribe();
    this.updateNotificationCount.emit(this.notificationsCount);
    message.status = data.status;
  }

  public deleteInAppMessage(message, i) {
    if (message.status === 'unread') {
      this.notificationsCount -= 1;
    }
    this.updateNotificationCount.emit(this.notificationsCount);
    this.notificationService.deleteInAppMessage(this.url, message.id).subscribe();
    this.notifications.splice(i, 1);
  }

  public hasProperty(item: object, property: string) {
    return item.hasOwnProperty(property);
  }
}
