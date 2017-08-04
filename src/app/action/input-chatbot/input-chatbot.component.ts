import { Component, ViewChild, ElementRef, OnInit, Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { LocalStorageService, SessionStorageService, SessionStorage } from 'ngx-webstorage';
import { Subscription } from 'rxjs/Subscription'
import { Observable } from 'rxjs/Observable'
import { Inquiry } from '../../models/inquiry.model';
import { Conversation } from '../../models/conversation.model';
import { ConversationWriter } from '../../models/conversation_writer.model';
import { AiBotMsg } from '../../models/aibotmsg.model';
import { ApiService  } from '../../service/api.service';
import { ChatbotService  } from '../../service/chatbot.service';
import { UtilsService } from '../../service/utils.service';
import { ConversationService } from '../../service/conversation.service';
import { UserMsg } from '../../models/usermsg.model';
import { Session } from '../../models/session.model';


@Component({
    selector: 'app-input-chatbot',
    templateUrl: './input-chatbot.component.html',
    styleUrls: ['./input-chatbot.component.scss']
  })

  export class InputChatbotComponent implements OnInit {
    
      private subscription: Subscription;
      private aiBotMsg: AiBotMsg;
    
      @ViewChild('message') msgInput: ElementRef;
        
      public placeholderMsg = "내용을 입력해 주세요.";
      
      private params:Inquiry;
      
      @SessionStorage('userSession')
      public userSession: Session;

      constructor(
                  private utilsService: UtilsService,
                  private chatbotService: ChatbotService,
                  private conversationService : ConversationService
                ) {
    
      }
    
      ngOnInit() {
        if (this.userSession.inputType === "address") {
          this.placeholderMsg = "주소를 입력해 주세요.";
        } else {
          this.placeholderMsg = "내용을 입력해 주세요.";
        }
      }
    
      public sendMsg(msg) {

        const userMsg:UserMsg = {msgType:"UserMsg", userId: uuid(), message:msg.value, telId:'010-1234-5678'};
        this.conversationService.broadcast(new Conversation(ConversationWriter.CUSTOMER, userMsg, Date.now()));

        this.params = this.utilsService.getInitInquiryData();
        this.params.question = msg.value;
        this.chatbotService.chatBotMsgApiCall(this.params);

        msg.value="";
        msg.focus();
    
      }

      public inputKeyupEvt(msg) {
        if (msg.value.length > 0) {
          // if (this.msgInputCheckTimer.closed) {
    
          // } else {
          //   // Clear Input Timer Start
          //   this.msgInputCheckTimer.unsubscribe();
          // }
        } else {
          console.log("msg is empty!!!");
        }
      }
    
    }