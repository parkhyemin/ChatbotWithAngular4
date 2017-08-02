import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { v4 as uuid } from 'uuid';

import { AiBotInitMsg } from '../../models/aibotinitmsg.model';
import { RspDeliveryList } from '../../models/rspDeliveryList.model';
import { RspMoreAnswer } from '../../models/rspMoreAnswer.model';
import { RspReserveList } from '../../models/rspReserveList.model';
import { Inquiry } from '../../models/inquiry.model';
import { Conversation } from '../../models/conversation.model';
import { ConversationWriter } from '../../models/conversation_writer.model';
import { UserMsg } from '../../models/usermsg.model';

import { ChatbotService } from '../../service/chatbot.service';
import { UtilsService } from '../../service/utils.service';
import { ConversationService } from '../../service/conversation.service'


@Component({
  selector: 'chat-content-aibotinitmsg',
  templateUrl: './aibotinitmsg.component.html',
  styleUrls: ['./aibotinitmsg.component.scss']

})
export class AiBotInitMsgComponent implements OnInit {

  public isNewAdded: boolean = false;
  public locPath: string = "/";

  @Input() aiBotInitMsg: AiBotInitMsg;
  @Input() timestamp: number;

  
  constructor(private platformLocation: PlatformLocation) {
    this.locPath = this.platformLocation.pathname;
  }

  ngOnInit() {

  }

}
