import { RspDeliveryList } from './rspDeliveryList.model';
import { RspReserveList } from './rspReserveList.model';
import { RspTopQuestionInfo } from './rspTopQuestionInfo.model';

export interface Session {

  chatMode: string; // "chatbot", "deepchat"
  lastAnswerId: string;
  invoiceNumber: string;
  reserveNumber: string;
  mode: string;
  inputType: string;
  company: string;
  media: string;
  phone: string;
  deviceId: string;
  type: string;
  sessionKey: string;
  lastRspDeliveryList: RspDeliveryList;
  lastRspReserveList: RspReserveList;

}
