import { Pipe, PipeTransform } from '@angular/core';

import { UtilsService } from '../service/utils.service';

@Pipe({
    name: 'weekday'
})
export class WeekDayPipe implements PipeTransform {

  constructor(private utilsService: UtilsService) { 

  }

  transform(value: any): any {
    
    if (!value)
      return value;
      
    const date = (value instanceof Date) ? value : new Date(value);
    return this.utilsService.getWeekDay(date);
  }
}