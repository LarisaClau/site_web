import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  public messageSubject = new Subject<string>();
  message$ = this.messageSubject.asObservable();
  messageSubscription: Subscription;
  showMessageBoolean: boolean=false;
  public messageTypeSubject = new Subject<string>();
  messageType$ = this.messageTypeSubject.asObservable();


  showMessage(message: string,  type?) {
    this.messageSubject.next(message);
    this.messageTypeSubject.next(type);
    setTimeout(() => {this.messageSubject.next('');}, 5000);
  }

  onCloseMessage() {
    this.messageSubscription.unsubscribe();
  }
}