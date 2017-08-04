import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MdInputModule, MdButtonModule, MdButtonToggleModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule, MdDialogModule, MdSnackBarModule } from '@angular/material';
import { Router, ActivatedRoute, NavigationCancel, Params } from '@angular/router';

import { AppComponent } from './app.component';

import { ActionModule } from './action/action.module';
import { ContentModule } from './content/content.module';
import { ServiceModule } from './service/service.module';
import { ShortenPipe } from 'ngx-pipes/src/app/pipes/string/shorten';

import { UtilsService } from './service/utils.service';
import { routing, appRoutingProviders } from './app.routing';
import { NoticeComponent } from './notice/notice.component';

@NgModule({
  declarations: [
    AppComponent,
    NoticeComponent
  ],
  imports: [
    routing,
    BrowserModule,
    HttpModule, 
    BrowserAnimationsModule,
    CommonModule, 
    ActionModule, 
    ContentModule, 
    ServiceModule,
    MdCardModule,
    MdToolbarModule,
    MdDialogModule,
    MdMenuModule,
    MdSnackBarModule,
    RouterModule
  ],
  providers: [
    ShortenPipe,
    appRoutingProviders,
    ContentModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
