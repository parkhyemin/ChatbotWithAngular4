import { RspTopQuestionInfo } from './rspTopQuestionInfo.model';
/*
{
  notice:""
  initMsg:"제가 학습하지 않은 질문을 해주셨네요. 열심히 공부해서 고객님의 기대에 부응하겠습니다 ^^"
}
*/

export interface AiBotInitMsg {
  msgType: "AiBotInitMsg";

  notice: string;
  initMsg: string;

  topQuestionInfoVo: Array<RspTopQuestionInfo>;
}