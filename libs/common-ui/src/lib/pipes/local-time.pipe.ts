import { Pipe, PipeTransform } from '@angular/core';
import { DateUtil } from '@tt/data-access/shared';

@Pipe({
  name: 'localTime',
  standalone: true,
})
export class LocalTimePipe implements PipeTransform {
  transform(date: string): string {
    const localDateTime = DateUtil.getLocalDateTime(date);

    return DateUtil.createCorrectDateString(':', localDateTime.hour, localDateTime.minute);
  }
}
