import { RspDeliveryList } from './rspDeliveryList.model';
import { RspMoreAnswer } from './rspMoreAnswer.model';
import { RspReserveList } from './rspReserveList.model';
/*
{
  address:""
  answerId:""
  code:""
  counsel:""
  cs:""
  deviceType:""
  error_message:""
  links:""
  message:"제가 학습하지 않은 질문을 해주셨네요. 열심히 공부해서 고객님의 기대에 부응하겠습니다 ^^"
  mode:"NOT MATCH"
  notice:""
}
*/

export interface AiBotMsg {
  msgType: "AiBotMsg";

  address: string;
  answerId: string;
  code: string;
  counsel: string;
  cs: string;
  deviceType: string;
  error_message: string;
  links: string;
  message: string;
  mode: string;
  number: number;
  showInvoiceBtn: boolean;

  responseMoreAnswer: Array<RspMoreAnswer>;
  responseDeliveryList: Array<RspDeliveryList>;
  responseReserveList: Array<RspReserveList>;
}