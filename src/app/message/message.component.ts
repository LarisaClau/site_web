import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit{

  message$=this.messageService.message$;
  type$ = this.messageService.messageType$;
  showMessageBoolean : boolean = false;
  type : string = '';

  constructor(private messageService: MessageService) {}
  
  ngOnInit(): void {
    this.showMessageBoolean= this.messageService.showMessageBoolean;
    this.type$.subscribe(res=> {this.type = res;})
  }

  onCloseClick() {
    this.showMessageBoolean = false;
    this.messageService.messageSubject.next('');
  }

  getMessageClass(type: string): string {
    if (type === 'error') {
      return 'message-red';
    } else if (type === 'success') {
      return 'message-green';
    } else {
      return 'message-default';
    }
  }
  
}
