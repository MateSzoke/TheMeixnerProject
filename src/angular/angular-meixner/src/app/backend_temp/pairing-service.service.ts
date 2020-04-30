import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PairingServiceService {

  private _members: {title: string, content1: string, content2: string}[] = [
    {title: 'Title', content1: 'Subtitle', content2: 'Content here'},
    {title: 'Title', content1: 'Subtitle', content2: 'Content here'},
    {title: 'Title', content1: 'Subtitle', content2: 'Content here'},
    {title: 'Title', content1: 'Subtitle', content2: 'Content here'},
  ];

  get members(): { title: string; content1: string; content2: string }[] {
    return this._members;
  }

  set members(value: { title: string; content1: string; content2: string }[]) {
    this._members = value;
  }

  constructor() { }
}
