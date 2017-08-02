
/*
{
  "number": "",
  "question": "안녕하세요",
  "media": "",
  "phone": "",
  "type": "",
  "session_key": "",
  "answerId": "",
  "address": "",
  "requestDeliveryInfo": [],
  "requestReserveInfo": [],
  "requestMoreAnswerInfo": []
}
*/

export interface Inquiry {
    number: string;
    question: string;
    custCode: string;
    media: string;
    phone: string;
    type: string;
    mode: string;
    deviceId: string;
    sessionKey: string;
    answerId: string;
    address: string;
    requestDeliveryInfo: Array<any>;
    requestReserveInfo: Array<any>;
    requestMoreAnswerInfo: Array<any>;
  }
  