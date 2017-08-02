
export interface RspDeliveryList {
    
    
    
    /*
    clntNum:"TEST0001"
    dlvbrancd:"1879"
    dlvbrannm:"서울남창"
    dlvdt:"20170605"
    dlvempnm:"배달부님"
    dlvempnum:"464212"
    entrfare:"2500"
    faredivnm:"신용"
    prngNum:"1.706050000003E12"
    scanCodeDT:"20170605"  ******
    scanCodeDiv:"11"
    scanCodeHR:"144220"
    scanCodeNM:"집화처리" *******
    skumn:"[다나와]엘지 플래트론 24인치 모니터 "******
    telNum:"1012345678"
    trspbillNum:"6.08395327091E11"*****
    
    scanCodeDT 스캔코드 처리 일자
    scanCodeHR 스캔코드 처리 시간
    scanCodeDiv;스캔코드 구분
    scanCodeNM; 스캔코드 명
    prngNum; 예약번호
    trspbillNum; 송장번호
    skuNM; 상품명
    displayCode; 배송단계
    clntNum; 고객구분
    
    */
    
      clntNum: string;
      prngNum: string;
      scanCodeDT: Date;
      scanCodeDiv: number;
      scanCodeHR: number;
      scanCodeNM: string;
      skuNM: string;
      trspbillNum: string;
      displayCode: string;
    }