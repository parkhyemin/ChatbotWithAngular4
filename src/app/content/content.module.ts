import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content.component';
import { UsermsgComponent } from './usermsg/usermsg.component';
import { AibotmsgComponent } from './aibotmsg/aibotmsg.component';
import { AiBotInitMsgComponent } from './aibotinitmsg/aibotinitmsg.component';
import { ReplacePipe } from '../pipes/replace.pipe';
import { WeekDayPipe } from '../pipes/weekday.pipe';
import { MdInputModule, MdSelectModule, MdButtonModule, MdButtonToggleModule, MdCardModule, MdCheckboxModule, MdMenuModule, MdToolbarModule, MdIconModule, MdDialogModule, MdSnackBarModule } from '@angular/material';
import { FillHeightDirective } from '../directives/fill-height.directive';
import { NgxAutoScroll } from '../directives/ngx-auto-scroll.directive';


@NgModule({
    imports: [
      CommonModule,
      MdInputModule,
      MdDialogModule,
      MdSelectModule,
      MdCardModule,
      MdCheckboxModule,
      MdButtonModule,
      MdButtonToggleModule
    ],
    declarations: [
      FillHeightDirective,
      NgxAutoScroll,
      ContentComponent, 
      UsermsgComponent, 
      AibotmsgComponent, 
      AiBotInitMsgComponent, 
      ReplacePipe,
      WeekDayPipe
    ],
    entryComponents: [
    ],
    exports: [
      ContentComponent, 
      FillHeightDirective, 
      NgxAutoScroll, 
      ReplacePipe, 
      WeekDayPipe
    ],
    providers: [

    ]
  })
export class ContentModule { }