import {DatePipe} from "@angular/common";

export class DateUtils {
  static datePipe = new DatePipe('en-US')

  public static getFormattedDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy. MM. dd.')
  }

  public static getFormattedDateTime(date: Date): string {
    return this.datePipe.transform(date, 'yyyy. MM. dd. HH:mm')
  }

}

