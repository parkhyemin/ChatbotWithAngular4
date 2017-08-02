
export interface RspReserveList {
    
    /*
    acptDt:"20170605"
    acptHr:"60118"
    divReg:"1"
    goods:"베이지 솔리드 심플 니트 (PQUCB8003)"
    gthprearrDt:"20170607"
    larcNm:"베이지 솔리드 심플 니트 (PQUCB8003)"
    prngNum:"1.706053949448E12"
    prngsts:"4"
    prngstsNm:"예약취소"
    rName:"신숙경"
    sName:"(주)신원"
    */
      acptDt: Date;
      acptHr:  string;
      divReg: string;
      goods: string;
      gthprearrDt: Date;
      larcNm: string;
      prngNum: string;
      prngsts: number;
      prngstsNm: string;
      rName: string;
      sName: string;
    }
    