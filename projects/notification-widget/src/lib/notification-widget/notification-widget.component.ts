import { Component, Input, OnInit, } from '@angular/core';
import { NotificationWidgetService } from '../notification-widget.service';
import { FlyoutSize } from '@acpaas-ui/ngx-flyout';

@Component({
  selector: 'aui-notification-widget',
  styleUrls: ['./notification-widget.component.scss'],
  templateUrl: './notification-widget.component.html'
})
export class NotificationWidgetComponent implements OnInit {

  /**
   * The URL to the BFF.
   */
  @Input() public url: string;
  @Input() public align: string = 'right'

  public notifications = [];
  public notificationsCount: Number = 0;
  public isLoadingMessages: Boolean = false;
  public isLoadingCount: Boolean = false;
  public isLoadingExtraNotifications: Boolean = false;
  public currentPage: Number = 1;
  public totalPages: Number = 1;
  public sizes = FlyoutSize;


  constructor(
    private notificationService: NotificationWidgetService
  ) {
  }

  ngOnInit() {
    this.fetchInAppMessagesUnreadCount();
  }

  private resetPageNumbers() {
    this.currentPage = 1;
    this.totalPages = 1;
  }

  private fetchInAppMessagesUnreadCount() {
    this.resetPageNumbers();
    this.isLoadingCount = true;
    this.notificationService.getInAppMessagesUnreadCount(this.url).subscribe((response: any) => {
      if (response.data) {
        this.notificationsCount = response.data;
      }
      this.isLoadingCount = false;
    }, (err) => {
      this.isLoadingCount = false;
      console.error(err);
    });
  }


  public fetchInAppMessages() {
    this.fetchInAppMessagesUnreadCount();
    this.isLoadingMessages = true;
    this.notificationService.getInAppMessages(this.url, this.currentPage).subscribe((response: any) => {
      if (response.data) {
        this.notifications = response.data.messages;
        this.totalPages = response.data.totalPages;
        this.currentPage = response.data.currentPage;
      }
      this.isLoadingMessages = false;
    }, (err) => {
      this.isLoadingMessages = false;
      console.error(err);
    });
  }

  public loadNotificationsFromPage(pageNumber) {
    this.isLoadingExtraNotifications = true;
    this.notificationService.getInAppMessages(this.url, pageNumber).subscribe((response: any) => {
      if (response.data) {
        this.notifications.push(...response.data.messages);
        this.totalPages = response.data.totalPages;
        this.currentPage = response.data.currentPage;
      }
      this.isLoadingExtraNotifications = false;
    }, (err) => {
      this.isLoadingExtraNotifications = false;
      console.error(err);
    });
  }

  public updateNotificationCount(count) {
    this.notificationsCount = count;
  }
}
