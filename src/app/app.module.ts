import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MdInputModule, MdButtonModule, MdButtonToggleModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule, MdDialogModule, MdSnackBarModule } from '@angular/material';
import { Router, ActivatedRoute, NavigationCancel, Params } from '@angular/router';

import { AppComponent } from './app.component';
import { ContentComponent } from './content/content.component';

import { ActionModule } from './action/action.module';
import { ContentModule } from './content/content.module';
import { ServiceModule } from './service/service.module';

import { UtilsService } from './service/utils.service';
import { routing, appRoutingProviders } from './app.routing';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    routing,
    BrowserModule,
    HttpModule, 
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
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
