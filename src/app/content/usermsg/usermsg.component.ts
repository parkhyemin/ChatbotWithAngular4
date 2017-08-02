import { Component, Input } from '@angular/core';

import { UserMsg } from '../../models/usermsg.model';


@Component({
  selector: 'chat-content-usermsg',
  templateUrl: './usermsg.component.html',
  styleUrls: ['./usermsg.component.scss']
})
export class UsermsgComponent  {

  isNewAdded: boolean = false;

  @Input() userMsg: UserMsg;
  @Input() timestamp: number;

 
}
