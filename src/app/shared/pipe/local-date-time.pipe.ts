import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'localDateTime'
})
export class LocalDateTimePipe implements PipeTransform {

  transform(dataHora: string): string {
    let dataHoraOut: moment.Moment = moment(dataHora, "YYYY-MM-DDTHH:mm:ss");
    return dataHoraOut.format("DD-MM-YY HH:mm");
  }

}
