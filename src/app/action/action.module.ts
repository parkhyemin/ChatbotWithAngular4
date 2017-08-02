import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ActionComponent } from './action.component';
import { InputChatbotComponent } from './input-chatbot/input-chatbot.component';
import { MdInputModule, MdButtonModule, MdButtonToggleModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule, MdDialogModule, MdSnackBarModule } from '@angular/material';


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
    InputChatbotComponent
  ],
  entryComponents: [
  ],
  exports: [
    ActionComponent
  ],
  providers: [
  ]
})
export class ActionModule { }