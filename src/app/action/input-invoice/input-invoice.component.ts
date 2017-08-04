import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, OnInit } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { LocalStorageService, SessionStorageService, SessionStorage } from 'ngx-webstorage';

import { Conversation } from '../../models/conversation.model';
import { ConversationWriter } from '../../models/conversation_writer.model';
import { Session } from '../../models/session.model';
import { AiBotMsg } from '../../models/aibotmsg.model';
import { UserMsg } from '../../models/usermsg.model';

import { ChatbotService } from '../../service/chatbot.service'
import { ConversationService } from '../../service/conversation.service'
import { UtilsService } from '../../service/utils.service'

@Component({
  selector: 'app-input-invoice',
  templateUrl: './input-invoice.component.html',
  styleUrls: ['./input-invoice.component.scss']
})
export class InputInvoiceComponent implements OnInit {

  @Input() loading: boolean;
  @Output() loadingChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @SessionStorage('userSession')
  public userSession: Session;

  private chatBotApiCallback = () => {
    console.log("---------->>>>> chatBotApiCallback <<<<----------------");

    // Return to chat input box!
    /*
    let userSession: Session = this.sessionSt.retrieve('userSession');
    userSession.inputType = "chatbot";
    this.sessionSt.store('userSession', userSession);
    */
  }

  constructor(private conversationService: ConversationService,
              private chatbotService: ChatbotService,
              private utilsService: UtilsService,
              private sessionSt: SessionStorageService) {

  }

  ngOnInit() {

  }

  public save(invoiceNumber) {
    this.userSession.invoiceNumber = invoiceNumber.value;

    const userMsg:UserMsg = {msgType:"UserMsg", userId: uuid(), message: invoiceNumber.value, telId: this.userSession.phone};
    this.conversationService.broadcast(new Conversation(ConversationWriter.CUSTOMER, userMsg, Date.now()) );

    // const loadingMsg:LoadingMsg = {msgType:"LoadingMsg", message:"", mode:"mode1"};
    // this.conversationService.broadcast( new Conversation(ConversationWriter.AI, loadingMsg, Date.now()) );

    let params = this.utilsService.getInitInquiryData();
    params.question = ""; // question should be empty string
    params.number = this.userSession.invoiceNumber;
    params.answerId = this.userSession.lastAnswerId;
    this.chatbotService.chatBotApiCall(params).subscribe(
      res => {
        console.log("---------- save invoice number -----------");
        console.log(res);
        res.msgType = "AiBotMsg" // set message type.
        const aiBotMsg: AiBotMsg = res;
        console.log("number => " + aiBotMsg.number);
        if ( aiBotMsg.responseDeliveryList.length > 0 && aiBotMsg.number > 0) {
          this.userSession.inputType = "chatbot";
          this.userSession.lastRspDeliveryList = aiBotMsg.responseDeliveryList.pop();
          this.userSession.lastRspReserveList = null;
          this.userSession = this.userSession;

          const userMsg:UserMsg = {msgType:"UserMsg", userId: uuid(), message:this.userSession.lastRspDeliveryList.skuNM, telId:this.userSession.phone};
          this.conversationService.broadcast(new Conversation(ConversationWriter.CUSTOMER, userMsg, Date.now()) );
        }
        this.conversationService.broadcast( new Conversation(ConversationWriter.AI, aiBotMsg, Date.now()) );
      },
      error => {
        // this.errorMessage = <any>error
      }
    ).add(this.chatBotApiCallback);
  }
}
