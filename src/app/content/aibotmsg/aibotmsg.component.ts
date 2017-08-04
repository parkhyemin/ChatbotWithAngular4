import { Component, Input, OnInit, ElementRef } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { Observable } from 'rxjs/Observable'
import { v4 as uuid } from 'uuid';
import { LocalStorageService, SessionStorageService, SessionStorage } from 'ngx-webstorage';

import { AiBotMsg } from '../../models/aibotmsg.model';
import { RspMoreAnswer} from '../../models/rspMoreAnswer.model';
import { Inquiry } from '../../models/inquiry.model';
import { Session } from '../../models/session.model';
import { RspDeliveryList } from '../../models/rspDeliveryList.model';
import { UserMsg } from '../../models/usermsg.model';
import { ConversationWriter } from '../../models/conversation_writer.model';
import { Conversation } from '../../models/conversation.model';
import { RspReserveList } from '../../models/rspReserveList.model';

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
export class AibotmsgComponent implements OnInit {

  isNewAdded: boolean = false;

  @Input() aiBotMsg: AiBotMsg;
  @Input() timestamp: number;

  public maxDeliveryNum = 3;
  public maxReserveNum = 3;

  public showInvoiceToggle: boolean = false;
  public locPath: string = "/";

  private rtnParams:Inquiry;

  @SessionStorage('userSession')
  private userSession: Session;

  constructor(private conversationService: ConversationService,
              private chatbotService: ChatbotService,
              private utilsService: UtilsService,
              private platformLocation: PlatformLocation,
              private elRef: ElementRef) {

    this.rtnParams = this.utilsService.getInitInquiryData();
    this.locPath = this.platformLocation.pathname;
  }

  private chatBotMsgApiCallback = () => {
    // this.contentComponent.forceScrollDown();
  };

  ngOnInit() {
    console.log("--------------- AiBotMsg ngOnInit ------------------");
    
    // 챗봇 답변에서 나온 버튼들 처리
    Observable.timer(0).subscribe(val => {
      const clsNms = ['.elMovePageBtn', '.elConnectAdviserBtn', '.elReserveCancelBtn'];
      clsNms.forEach((clsNm) => {
        const elms = this.elRef.nativeElement.querySelectorAll(clsNm);
        if (elms.length > 0) {
          for (let el of elms) {
            switch(clsNm) {
              // <button class="elMovePageBtn" url="링크주소" (click)="movePage('url')">화면 전화 이름</button>
              case ".elMovePageBtn":
                el.addEventListener('click', (evt) => this.movePage(evt, el.getAttribute('url')));
                break;
              // <button class="elReserveCancelBtn" reserveNum="예약번호" (click)="reserveCancel()">예약 취소</button>
              case ".elReserveCancelBtn":
                el.addEventListener('click', (evt) => this.reserveCancel(evt, el.getAttribute('reserveNum')));
                break;
              // <button class="elConnectAdviserBtn" (click)="connectAdviser()">상담원 연결</button>
              case ".elConnectAdviserBtn":
                el.addEventListener('click', (evt) => this.connectAdviser(evt));
                break;
              default:
  
                break;
            }
          }
        }
      });
    });
    

  }

  public movePage(evt, url){

  }

  // 예약 취소
  public reserveCancel(evt, reserveNum){
    console.log("reserve Cancel Mode => " + this.userSession.media);
    switch(this.userSession.media) {
      case "APP":
        this.chatbotService.chatBotReserveCancelApiCall({reserveNum : reserveNum});
        break;
      case "WEB":

        break;
      case "COM":

        break;
      case "KKO":

        break;
      default:

        break;
    }
  }
  public connectAdviser(evt){

  }

  public answerDetail(answerId: string, rspMoreAns: RspMoreAnswer) {
      // this.rtnParams = this.utilsService.getInitInquiryData();
      // this.rtnParams.answerId = "";
      // this.rtnParams.requestMoreAnswerInfo.push(rspMoreAns);
      // this.chatbotService.chatBotMsgApiCall(this.rtnParams);
      const userMsg:UserMsg = {msgType:"UserMsg", userId: uuid(), message:rspMoreAns.answer, telId:this.userSession.phone};
      this.conversationService.broadcast(new Conversation(ConversationWriter.CUSTOMER, userMsg, Date.now()) );
  
      this.rtnParams = this.utilsService.getInitInquiryData();
      this.rtnParams.answerId = "";
      if (typeof this.userSession.lastRspDeliveryList != 'undefined' && this.userSession.lastRspDeliveryList) {
        this.rtnParams.requestDeliveryInfo.push(this.userSession.lastRspDeliveryList);
      }
      this.rtnParams.requestMoreAnswerInfo.push(rspMoreAns);
      if (typeof this.userSession.lastRspReserveList != 'undefined' && this.userSession.lastRspReserveList) {
        this.rtnParams.requestReserveInfo.push(this.userSession.lastRspReserveList);
      }
      this.chatbotService.chatBotMsgApiCall(this.rtnParams).add(this.chatBotMsgApiCallback);
  }

  public reserveDetail(answerId: string, rspRsv: RspReserveList) {
    
      // 예약 정보 초기화
      if (this.userSession.company == "0000000000") {
        this.userSession.lastRspDeliveryList = null;
        this.userSession.lastRspReserveList = rspRsv;
        this.userSession = this.userSession;
      } else {
  
      }
  
      const userMsg:UserMsg = {msgType:"UserMsg", userId: uuid(), message:rspRsv.goods, telId:this.userSession.phone};
      this.conversationService.broadcast(new Conversation(ConversationWriter.CUSTOMER, userMsg, Date.now()) );
  
      this.rtnParams = this.utilsService.getInitInquiryData();
      this.rtnParams.answerId = answerId;
      this.rtnParams.requestReserveInfo.push(rspRsv);
      this.chatbotService.chatBotMsgApiCall(this.rtnParams).add(this.chatBotMsgApiCallback);
    }

  public deliverySearch(answerId: string, rspDelivery: RspDeliveryList) {
    //배송 정보 초기화
    if (this.userSession.company == "0000000000") {
      this.userSession.lastRspDeliveryList = rspDelivery;
      this.userSession.lastRspReserveList = null;
      this.userSession = this.userSession;
    } else {

    }

    const userMsg:UserMsg = {msgType:"UserMsg", userId: uuid(), message:rspDelivery.skuNM, telId:this.userSession.phone};
    this.conversationService.broadcast(new Conversation(ConversationWriter.CUSTOMER, userMsg, Date.now()) );

    this.rtnParams = this.utilsService.getInitInquiryData();
    this.rtnParams.answerId = answerId;
    this.rtnParams.requestDeliveryInfo.push(rspDelivery);
    this.chatbotService.chatBotMsgApiCall(this.rtnParams).add(this.chatBotMsgApiCallback);
  }

  public showMoreDelivList(numOfList) {
    if ( this.aiBotMsg.responseDeliveryList.length > this.maxDeliveryNum ) {
      this.maxDeliveryNum = this.maxDeliveryNum + numOfList;
    }
  }

  public showMoreReserveist(numOfList) {
    if ( this.aiBotMsg.responseReserveList.length > this.maxReserveNum ) {
      this.maxReserveNum = this.maxReserveNum + numOfList;
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
