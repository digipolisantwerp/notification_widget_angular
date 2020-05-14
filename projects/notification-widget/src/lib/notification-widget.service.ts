import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class NotificationWidgetService {
  constructor(
    private httpClient: HttpClient,
  ) { }


  getInAppMessages(url, pageNumber: Number = 0) {
    return this.httpClient.get(`${url}${pageNumber > 0 ? '?sort=-createdAt&page=' + pageNumber : ''}`);
  }

  getInAppMessagesUnreadCount(url) {
    return this.httpClient.get(`${url}/overview`);
  }

  updateInAppMessageStatus(url, id, data) {
    return this.httpClient.patch(`${url}/${id}`, data);
  }

  deleteInAppMessage(url, id) {
    return this.httpClient.delete(`${url}/${id}`);
  }
}
