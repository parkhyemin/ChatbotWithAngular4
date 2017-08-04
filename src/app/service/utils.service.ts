import {Injectable} from '@angular/core';
import * as _ from 'lodash';
import { Subscription } from 'rxjs/Subscription'
import { LocalStorageService, SessionStorageService, SessionStorage } from 'ngx-webstorage';
import { Inquiry } from '../models/inquiry.model';
import { Session } from '../models/session.model';


@Injectable()
export class UtilsService {

  private weekDays = new Array('일', '월', '화', '수', '목', '금', '토');

  @SessionStorage('userSession')
  public userSession: Session;

  public getInitSessionData() {
    return {
      chatMode: "chatbot",
      lastAnswerId: "",
      invoiceNumber: "",
      reserveNumber: "",
      mode: "",
      inputType: "chatbot",
      company: "1",
      media: "APP",
      phone: "010-1234-5678",
      deviceId: "",
      type: "",
      sessionKey: "TestSessionKey_Phm",
      lastRspDeliveryList: null,
      lastRspReserveList: null
    };
  }

  public getInitInquiryData() {
    console.log("=========== getInitInquiryData ===========");
    return {
      number: "",
      question: "",
      custCode: this.userSession.company,
      media: this.userSession.media,
      phone: this.userSession.phone,
      type: "",
      mode: this.userSession.mode,
      deviceId: this.userSession.deviceId,
      sessionKey: this.userSession.sessionKey,
      answerId: "",
      address: "",
      requestDeliveryInfo: [],
      requestReserveInfo: [],
      requestMoreAnswerInfo: []
    };
  }

  public getWeekDay(date) {
    return this.weekDays[date.getDay()] + "요일";
  }

}