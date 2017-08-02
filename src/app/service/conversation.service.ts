
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable'

import { AiBotMsg } from '../models/aibotmsg.model';
import { Conversation } from '../models/conversation.model';
import { ConversationWriter } from '../models/conversation_writer.model';
import { UserMsg } from '../models/usermsg.model';
import { Msg } from '../models/msg.model';
import {ContentComponent } from '../content/content.component';

type MessageCallback = (payload: any) => void;

@Injectable()
export class ConversationService {
  private handler = new Subject<Conversation>();
  
  broadcast(conversation: Conversation) {
    this.handler.next(conversation);
  }

  subscribeAll(callback: MessageCallback): Subscription {
    return this.handler.subscribe(callback);
  }
  
}
