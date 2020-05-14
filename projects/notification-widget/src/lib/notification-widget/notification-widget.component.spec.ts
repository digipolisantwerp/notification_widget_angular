import {
  TestBed,
  ComponentFixture,
} from '@angular/core/testing';
import { ElementRef } from '@angular/core';

import {
  NotificationWidgetComponent,
} from './notification-widget.component';

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

describe('NotificationWidgetComponent', () => {

  let fixture: ComponentFixture<NotificationWidgetComponent>;
  let comp: NotificationWidgetComponent;
  let element: any;

  class MockNotificationWidgetService {
    getInAppMessagesUnreadCount() {
      return observableOf({data: 3});
    }

    getInAppMessages() {
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
    fixture = TestBed.createComponent(NotificationWidgetComponent);
    comp = fixture.componentInstance;
    element = fixture.nativeElement;
    comp.url = "localhost";
  });

  afterEach(() => {
    if (element) {
      document.body.removeChild(element);
    }
  });

  it('should show unread count', () => {
    fixture.detectChanges();
    expect(comp.notificationsCount).toEqual(3);
  });

  it('should edit unread count manually', () => {
    comp.updateNotificationCount(2)
    expect(comp.notificationsCount).toEqual(2);
  });

  it('should be able to fetch the in app messages', (done) => {
    comp.fetchInAppMessages();
    const spyUnreadCount = spyOn<any>(comp, 'fetchInAppMessagesUnreadCount').and.callThrough();
    const spyReset = spyOn<any>(comp, 'resetPageNumbers').and.callThrough();
    fixture.detectChanges();
    setTimeout(() => {
      expect(spyUnreadCount).toHaveBeenCalled();
      expect(spyReset).toHaveBeenCalled();
      expect(comp.notifications.length).toEqual(messages.messages.length);
      expect(comp.totalPages).toEqual(messages.totalPages);
      expect(comp.currentPage).toEqual(messages.currentPage);
      done();
    }, 10);
  });


  it('should be able to call loadNotificationsFromPage', (done) => {
    let service = fixture.debugElement.injector.get(NotificationWidgetService);
    const spy = spyOn(service, 'getInAppMessages').and.callThrough();
    comp.loadNotificationsFromPage(2);
    fixture.detectChanges();
    setTimeout(() => {
      expect(spy).toHaveBeenCalledWith('localhost', 2);
      done();
    }, 10);
  });


});

class MockElementRef extends ElementRef {
  constructor() {
    super(null);
  }
}
