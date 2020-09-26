export class DateUtils {

  public static getFormattedDate(date: Date): string {
    let formattedDate = new Date(date);
    return `${formattedDate.getFullYear()}.${formattedDate.getMonth().toString().padStart(2, '0')}.${formattedDate.getDay().toString().padStart(2, '0')}.`
  }

}

