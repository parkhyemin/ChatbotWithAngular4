import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription'
import { Observable } from 'rxjs/Observable'

import { Conversation } from '../models/conversation.model';
import { Inquiry } from '../models/inquiry.model';

import { UtilsService } from '../service/utils.service';
import { ChatbotService } from '../service/chatbot.service';

@Component({
  selector: 'chat-action',
  providers: [],
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {

  public inputType: string = "chatbot";

  @Input() loading: boolean;
  @Output() loadingChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  private params:Inquiry;

  constructor(private chatbotService: ChatbotService) {}

  ngOnInit() {
    
    Observable.timer(100).subscribe(val => {
      const params = {custCode: '1'};
      this.chatbotService.chatBotInitMsgApiCall(params);
    });

  }

  ngOnDestroy() {
    // this.sessionSt.observe('userSession').unsubscribe();
  }

 
}
