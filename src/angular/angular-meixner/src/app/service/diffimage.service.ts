import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DiffimageService {

  private folderPath: String = 'assets/icons/';
  private level0Diff: String = 'bars_empty.png';
  private level1Diff: String = 'bars_lv1.png';
  private level2Diff: String = 'bars_lv2.png';
  private level3Diff: String = 'bars_lv3.png';
  private level4Diff: String = 'bars_lv4.png';

  constructor() { }

  public convertNumToPath(diff: number): String {
    switch (diff) {
      case 0 : {
        return this.folderPath.concat(this.level0Diff.toString());
      }
      case 1 : {
        return this.folderPath.concat(this.level1Diff.toString());
      }
      case 2 : {
        return this.folderPath.concat(this.level2Diff.toString());
      }
      case 3 : {
        return this.folderPath.concat(this.level3Diff.toString());
      }
      case 4 : {
        return this.folderPath.concat(this.level4Diff.toString());
      }
      default : {
        return this.folderPath.concat(this.level0Diff.toString());
      }
    }
  }

  public convertNumToPath100(diff: number): string {

    if (diff < 20) {
      return this.folderPath.concat(this.level0Diff.toString());
    } else if (diff < 40) {
      return this.folderPath.concat(this.level1Diff.toString());
    } else if (diff < 60) {
      return this.folderPath.concat(this.level2Diff.toString());
    } else if (diff < 80) {
      return this.folderPath.concat(this.level3Diff.toString());
    } else if (diff < 100) {
      return this.folderPath.concat(this.level4Diff.toString());
    } else {
      return this.folderPath.concat(this.level0Diff.toString());
    }
  }

}
