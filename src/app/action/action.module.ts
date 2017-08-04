import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocalStorageService, SessionStorageService, SessionStorage } from 'ngx-webstorage';

import { ActionComponent } from './action.component';
import { InputChatbotComponent } from './input-chatbot/input-chatbot.component';
import { MdInputModule, MdButtonModule, MdButtonToggleModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule, MdDialogModule, MdSnackBarModule } from '@angular/material';
import { InputInvoiceComponent } from './input-invoice/input-invoice.component';


@NgModule({
  imports: [
    CommonModule,
    MdCardModule,
    MdDialogModule,
    MdMenuModule,
    MdSnackBarModule
  ],
  declarations: [
    ActionComponent,
    InputChatbotComponent,
    InputInvoiceComponent
  ],
  entryComponents: [
  ],
  exports: [
    ActionComponent
  ],
  providers: [
    SessionStorageService
  ]
})
export class ActionModule { }