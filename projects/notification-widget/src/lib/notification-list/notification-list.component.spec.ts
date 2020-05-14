import {
  TestBed,
  ComponentFixture,
} from '@angular/core/testing';
import { ElementRef } from '@angular/core';

import {
  NotificationListComponent,
} from './notification-list.component';

import {
  NotificationWidgetModule
} from '../notification-widget.module';

import {
  NotificationWidgetService
} from '../notification-widget.service';

let messages = {
  "messages": [
    {
      "status": "unread",
      "id": 1,
      "message": {
        "message": "Dit is eerste notificatie"
      }
    }
  ],
  "totalPages": 1,
  "currentPage": 1
}


import { of as observableOf } from 'rxjs';

describe('NotificationListComponent', () => {

  let fixture: ComponentFixture<NotificationListComponent>;
  let comp: NotificationListComponent;
  let element: any;

  class MockNotificationWidgetService {
    updateInAppMessageStatus() {
      return observableOf({data: {}});
    }

    deleteInAppMessage() {
      return observableOf({data: messages});
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NotificationWidgetModule],
      providers: [
        {provide: NotificationWidgetService, useClass: MockNotificationWidgetService}
      ]
    });
    fixture = TestBed.createComponent(NotificationListComponent);
    comp = fixture.componentInstance;
    element = fixture.nativeElement;
    comp.url = "localhost";
    comp.notifications = messages.messages;
    comp.notificationsCount = 1;
    comp.isLoading = false;
    comp.isLoadingExtraNotifications = false;
    comp.currentPage = 1;
    comp.totalPages = 1;
  });

  afterEach(() => {
    if (element) {
      document.body.removeChild(element);
    }
  });


  it('should be able to update notification status to read', (done) => {
    let service = fixture.debugElement.injector.get(NotificationWidgetService);
    const spy = spyOn(service, 'updateInAppMessageStatus').and.callThrough();
    comp.setInAppMessageStatus(messages.messages[0]);
    fixture.detectChanges();
    setTimeout(() => {
      expect(spy).toHaveBeenCalledWith('localhost', 1, {status: 'read'});
      done();
    }, 10);
  });

  it('should be able to update notification status to unread', (done) => {
    let service = fixture.debugElement.injector.get(NotificationWidgetService);
    const spy = spyOn(service, 'updateInAppMessageStatus').and.callThrough();
    comp.setInAppMessageStatus(messages.messages[0]);
    fixture.detectChanges();
    setTimeout(() => {
      expect(spy).toHaveBeenCalledWith('localhost', 1, {status: 'unread'});
      done();
    }, 10);
  });

  it('should be able to delete a notification', (done) => {
    let service = fixture.debugElement.injector.get(NotificationWidgetService);
    const spy = spyOn(service, 'deleteInAppMessage').and.callThrough();
    comp.deleteInAppMessage(messages.messages[0], 0);
    fixture.detectChanges();
    setTimeout(() => {
      expect(spy).toHaveBeenCalledWith('localhost', 1);
      expect(comp.notifications.length).toEqual(0);
      done();
    }, 10);
  });

});

class MockElementRef extends ElementRef {
  constructor() {
    super(null);
  }
}
