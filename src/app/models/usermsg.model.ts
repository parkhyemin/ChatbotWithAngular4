
export interface UserMsg {
    msgType: "UserMsg";
  
    userId: string;
    message: string;
    telId: string;
  }