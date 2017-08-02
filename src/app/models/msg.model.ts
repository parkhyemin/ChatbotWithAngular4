import { AiBotMsg } from './aibotmsg.model';
import { AiBotInitMsg } from './aibotinitmsg.model';
import { UserMsg } from './usermsg.model';

export type Msg = AiBotMsg | AiBotInitMsg | UserMsg ;
