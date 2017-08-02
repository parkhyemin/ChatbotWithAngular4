import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../service/api.service';
import { UtilsService } from '../service/utils.service';
import { ConversationService } from '../service/conversation.service';
import { ChatbotService } from '../service/chatbot.service';


@NgModule({
    imports: [
      CommonModule
    ],
    declarations: [
      
    ],
    entryComponents: [
    ],
    exports: [
      
    ],
    providers: [
        ApiService, UtilsService, ConversationService, ChatbotService
    ]
  })
export class ServiceModule { }