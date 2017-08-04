import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription'
import { Observable } from 'rxjs/Observable'
import { LocalStorageService, SessionStorageService, SessionStorage } from 'ngx-webstorage';

import { Session } from '../models/session.model';
import { Inquiry } from '../models/inquiry.model';

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

  @SessionStorage('userSession')
  public userSession: Session;

  private params:Inquiry;

  constructor(private chatbotService: ChatbotService,
              private sessionSt: SessionStorageService) {}

  ngOnInit() {
    
    // this.msgInputChange.timeout;
    this.sessionSt.observe('userSession')
    .subscribe((userSess: Session) => {
      this.inputType = userSess.inputType;
    });

    Observable.timer(100).subscribe(val => {
      const params = {custCode: this.userSession.company};
      this.chatbotService.chatBotInitMsgApiCall(params,["topQuestionInfoVo"]);
    });

  }

  ngOnDestroy() {
    // this.sessionSt.observe('userSession').unsubscribe();
  }

 
}
