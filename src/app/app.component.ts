import { Component, Renderer } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { Router, ActivatedRoute, NavigationCancel, Params } from '@angular/router';
import { UtilsService } from './service/utils.service';
import { LocalStorage, SessionStorage } from 'ngx-webstorage';
import { Session } from './models/session.model';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {

  public locPath: string = "/";
  
  @SessionStorage('userSession')
  private userSession: Session;

  constructor(private route: ActivatedRoute,
              private renderer: Renderer,
              private utilsService: UtilsService,
              private platformLocation: PlatformLocation) {
    this.userSession = this.utilsService.getInitSessionData();
    this.renderer.setElementClass(document.body, 'mobileBodyClass', true);
    this.locPath = this.platformLocation.pathname;
  }
  
  ngOnInit() {
    // 최초 실행시
    // this.dialog.open(CustInfoFormComponent);
    // this.dialog.open(BankAccountInfoFormComponent);
   
    /* --------------------------------------------------
    this.route.params.forEach((params: Params) => {
      console.log(params);
    });
    ----------------------------------------------------- */

    this.userSession.media = 'APP';
    this.userSession.phone = '010-1234-5678';
    this.userSession.company = '1';
    this.userSession.deviceId = '';
    this.userSession.sessionKey = 'TestSessionKey_PHM';
    
    // this.route.queryParams.subscribe((params: Params) => {
      
    //   // phone=핸드폰번호
    //   // machine=기기값
    //   // company=주관고객코드
    //   // media=미디어 ( APP/COM/WEB/KKO )
      
    //   this.userSession.media = params['media'];
    //   this.userSession.phone = params['phone'];
    //   this.userSession.company = params['company'];
    //   this.userSession.deviceId = params['machine'];
    //   this.userSession.sessionKey = params['sessionKey'];

    //   this.userSession = this.userSession
    //   console.log(this.userSession);
    //  });
  }

  public close() {
    switch(this.userSession.media) {
      case "APP":
        window.location.href="chatbot://close";
        break;
      case "WEB":
        window.opener.location = this.locPath;
        window.close();
        // window.open('','_self').close();
        break;
      case "COM":
        window.opener.location = this.locPath;
        window.close();
        // window.open('','_self').close();
        break;
      case "KKO":

        break;
      default:

        break;
    }
  }
}
