import { Component, Input } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { LocalStorageService, SessionStorageService, SessionStorage } from 'ngx-webstorage';

import { AiBotMsg } from '../../models/aibotmsg.model';
import { RspMoreAnswer} from '../../models/rspMoreAnswer.model';
import { Inquiry } from '../../models/inquiry.model';
import { Session } from '../../models/session.model';
import { RspDeliveryList } from '../../models/rspDeliveryList.model';

import { ApiService  } from '../../service/api.service';
import { ChatbotService  } from '../../service/chatbot.service';
import { UtilsService } from '../../service/utils.service';
import { ContentComponent } from '../../content/content.component';
import { ConversationService } from '../../service/conversation.service';


@Component({
  selector: 'chat-content-aibotmsg',
  templateUrl: './aibotmsg.component.html',
  styleUrls: ['./aibotmsg.component.scss']
})
export class AibotmsgComponent  {

  isNewAdded: boolean = false;

  @Input() aiBotMsg: AiBotMsg;
  @Input() timestamp: number;

  public maxDeliveryNum = 3;
  public showInvoiceToggle: boolean = false;
  public locPath: string = "/";

  private rtnParams:Inquiry;

  @SessionStorage('userSession')
  private userSession: Session;

  constructor(private conversationService: ConversationService,
              private chatbotService: ChatbotService,
              private utilsService: UtilsService,
              private platformLocation: PlatformLocation) {

    this.rtnParams = this.utilsService.getInitInquiryData();
    this.locPath = this.platformLocation.pathname;
  }
  public answerDetail(answerId: string, rspMoreAns: RspMoreAnswer) {
      this.rtnParams = this.utilsService.getInitInquiryData();
      this.rtnParams.answerId = "";
      this.rtnParams.requestMoreAnswerInfo.push(rspMoreAns);
      this.chatbotService.chatBotMsgApiCall(this.rtnParams);
  }

  public deliverySearch(answerId: string, rspDelivery: RspDeliveryList) {
    
    // 배송 정보 초기화
    // if (this.userSession.company == "0000000000") {
    //   this.userSession.lastRspDeliveryList = rspDelivery;
    //   this.userSession.lastRspReserveList = null;
    //   this.userSession = this.userSession;
    // } else {

    // }

    // const userMsg:UserMsg = {msgType:"UserMsg", userId: uuid(), message:rspDelivery.skuNM, telId:this.userSession.phone};
    // this.conversationService.broadcast(new Conversation(ConversationWriter.CUSTOMER, userMsg, Date.now()) );

    // this.rtnParams = this.utilsService.getInitInquiryData();
    // this.rtnParams.answerId = answerId;
    // this.rtnParams.requestDeliveryInfo.push(rspDelivery);
    // this.chatbotService.chatBotMsgApiCall("AiBotMsg", this.rtnParams).add(this.chatBotMsgApiCallback);
  }

  // 더보기
  public showMoreDelivList(numOfList) {
    if ( this.aiBotMsg.responseDeliveryList.length > this.maxDeliveryNum ) {
      this.maxDeliveryNum = this.maxDeliveryNum + numOfList;
    }
  }

  // 송장번호 입력
  public showInvoiceInputBox() {
    if (this.userSession.inputType === "deepchat") {
      
    } else {
      this.showInvoiceToggle = !this.showInvoiceToggle;
      if (this.showInvoiceToggle) {
        this.userSession.inputType = "invoice";
      } else {
        this.userSession.inputType = "chatbot";
      }
      this.userSession = this.userSession;
    }
  }
 
}
