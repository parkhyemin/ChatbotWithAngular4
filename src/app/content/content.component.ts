import { Component, ViewChild, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription'
import { Observable } from 'rxjs/Observable'
import { LocalStorageService, SessionStorageService, SessionStorage } from 'ngx-webstorage';

import { Session } from '../models/session.model';
import { Conversation } from '../models/conversation.model';

import { ConversationService } from '../service/conversation.service';

import { NgxAutoScroll } from '../directives/ngx-auto-scroll.directive';

@Component({
    selector: 'chat-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss']
  })
  export class ContentComponent implements OnInit{

    @ViewChild(NgxAutoScroll) ngxAutoScroll: NgxAutoScroll;

    private subscription: Subscription;
    
    private conversations: Array<Conversation> = [];

    @SessionStorage('userSession')
    private userSession: Session;

    constructor(private conversationService:ConversationService ){
      this.subscribe();
    }

    public forceScrollDown(): void {
      this.ngxAutoScroll.forceScrollDown();
    }

    public forceScrollUp(): void {
      this.ngxAutoScroll.forceScrollUp();
    }

    ngOnInit() {
    }
  
    ngOnDestroy() {
      this.unsubscribe();
    }
  
    get unsubscribed() {
      return this.subscription && this.subscription.closed;
    }
    
    clear() {
      this.conversations = [];
    }

    unsubscribe() {
      this.subscription.unsubscribe();
    }

    subscribe() {
      this.subscription = this.conversationService.subscribeAll((payload) => {
        console.log("------------- subscription ------------------" );
        console.log("msg type => " + payload.message.msgType );
        switch (payload.message.msgType) {
          case "AiBotMsg":
            this.conversations.push(payload);
            if (typeof payload.message.mode != 'undefined' && payload.message.mode) {
              this.userSession.mode = payload.message.mode;
            }
            this.userSession.lastAnswerId = payload.message.answerId;
            this.userSession = this.userSession;
            break;
          case "AiBotInitMsg":
            this.conversations.push(payload);
            break;
          // case "SpectraMsg":
          //   if (payload.message.flag === 'A') {
          //     //  remove loading image.
          //     console.log("remove loading image. !!!!");
          //     this.conversations.pop();
          //   }
          //   this.conversations.push(payload);
            // break;
          case "UserMsg":
            this.conversations.push(payload);
            break;
          default:
            this.conversations.push(payload);
            break;
        }
        Observable.timer(100).subscribe(val => this.forceScrollDown());
      });
    }
  }