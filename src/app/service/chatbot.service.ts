import {Injectable} from '@angular/core';
import * as _ from 'lodash';
import { Subscription } from 'rxjs/Subscription'
import { Observable } from 'rxjs/Observable'


import { ApiService,  } from '../service/api.service';
import { AiBotMsg } from '../models/aibotmsg.model';
import { AiBotInitMsg } from '../models/aibotinitmsg.model';
import { Conversation } from '../models/conversation.model';
import { ConversationWriter } from '../models/conversation_writer.model';
import { UserMsg } from '../models/usermsg.model';
import { Inquiry } from '../models/inquiry.model';

import { ConversationService } from './conversation.service';

@Injectable()
export class ChatbotService {

    private clonedApi: ApiService;

  constructor(
                private apiService: ApiService,
                private conversationService : ConversationService
            ) {
    this.clonedApi = Object.assign(Object.create(this.apiService), this.apiService);
    this.clonedApi.setApiUrl('/chatbot/proxy');
  }

    public chatBotApiCall(params: Inquiry): Observable<any> {
        return this.clonedApi.post("/finbot/asyncAutoAnswer.wn", params);
    }

    // normal api
    public chatBotMsgApiCall(params: any): Subscription {

        return this.clonedApi.post('/finbot/asyncAutoAnswer.wn', params)
        .subscribe(
            res => {
            res.msgType = 'AiBotMsg';
            res.responseDeliveryList.map(item =>{
                item.scanCodeDT = item.scanCodeDT.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
                return item;
            });
            res.responseReserveList.map(item => {
                // date format convert
                item.acptDt = item.acptDt.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
                item.gthprearrDt = item.gthprearrDt.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
                return item;
            });
            
            let aiBotMsg: AiBotMsg = res;
            this.conversationService.broadcast(new Conversation(ConversationWriter.AI, aiBotMsg, Date.now()));
            console.log(aiBotMsg);
        },
        error => {
            // this.errorMessage = <any>error
        })
  }

    public chatBotReserveCancelApiCall(params: object): Subscription {
      
        return this.clonedApi.post("/finbot/cancelReserve.wn", params)
            .retry(3)
            .subscribe(
            res => {
            res.msgType = "AiBotMsg";
            let aiBotMsg: AiBotMsg = res;
            this.conversationService.broadcast( new Conversation(ConversationWriter.AI, aiBotMsg, Date.now()) );
            },
            error => {
            // this.errorMessage = <any>error
            }
        );
    }

  public chatBotInitMsgApiCall(params: object): Subscription {
    return this.clonedApi.post('/finbot/init.wn', params)
        .subscribe(
        res => {
            res.msgType = 'AiBotInitMsg';
            let aiBotInitMsg: AiBotInitMsg = res;
            this.conversationService.broadcast(new Conversation(ConversationWriter.AI, aiBotInitMsg, Date.now()));
        },
        error => {
            // this.errorMessage = <any>error
        })
   
    }

}