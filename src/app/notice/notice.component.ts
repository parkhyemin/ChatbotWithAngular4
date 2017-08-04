import { Component, OnInit } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { LocalStorageService, SessionStorageService, SessionStorage } from 'ngx-webstorage';
import { ShortenPipe } from 'ngx-pipes/src/app/pipes/string/shorten';

import { Session } from '../models/session.model';

import { UtilsService } from '../service/utils.service';

@Component({
  selector: 'chat-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.scss']
})
export class NoticeComponent implements OnInit {

  public today = new Date();

  public weekDayNm = this.utilsService.getWeekDay(this.today);

  public showNotice: boolean = true;
  public selected:boolean = false;

  public locPath: string = "/";

  @SessionStorage('userSession')
  private userSession: Session;

  public productNm: string = "";
  public deliveryNum: string = "";

  constructor(private sessionSt: SessionStorageService,
              private utilsService: UtilsService,
              private shortenPipe: ShortenPipe,
              private platformLocation: PlatformLocation) {

    this.locPath = this.platformLocation.pathname;
  }

  ngOnInit() {
    
    this.sessionSt.observe('userSession')
        .subscribe((userSess: Session) => {
          console.log("++++++++++++++++ user session +++++++++++++++++++++++");

          if(typeof userSess.lastRspDeliveryList != 'undefined' && userSess.lastRspDeliveryList) {
            this.showNotice = true;
            this.selected= true;
            this.productNm = (typeof userSess.lastRspDeliveryList.skuNM != 'undefined' && userSess.lastRspDeliveryList.skuNM) ? userSess.lastRspDeliveryList.skuNM : "없음";
            this.deliveryNum = (typeof userSess.lastRspDeliveryList.trspbillNum != 'undefined' && userSess.lastRspDeliveryList.trspbillNum) ? userSess.lastRspDeliveryList.trspbillNum : "없음";
          } else if (typeof userSess.lastRspReserveList != 'undefined' && userSess.lastRspReserveList) {
            this.showNotice = true;
            this.selected= true;
            this.productNm = (typeof userSess.lastRspReserveList.goods != 'undefined' && userSess.lastRspReserveList.goods) ? userSess.lastRspReserveList.goods : "없음";
            this.deliveryNum = (typeof userSess.lastRspReserveList.prngNum != 'undefined' && userSess.lastRspReserveList.prngNum) ? userSess.lastRspReserveList.prngNum : "없음";
          } else if (!userSess.lastRspReserveList && !userSess.lastRspDeliveryList) {
            this.showNotice = true;
            this.selected= false;
            this.productNm = "";
            this.deliveryNum = "";
          } else {
            this.selected= false;
            this.productNm = "";
            this.deliveryNum = "";
          }

          if (userSess.media === "APP") {
            this.productNm = this.shortenPipe.transform(this.productNm, 12, "...");
          }
        });
  }

  ngOnDestroy() {
    // this.sessionSt.observe('userSession').unsubscribe();
  }

  closeNotice() {
    if (this.userSession.lastRspDeliveryList) {
      this.userSession.lastRspDeliveryList = null;
    }
    if (this.userSession.lastRspReserveList) {
      this.userSession.lastRspReserveList = null;
    }
    this.userSession = this.userSession;
  }
}
