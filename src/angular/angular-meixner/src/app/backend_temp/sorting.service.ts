import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SortingService {

  private _members: {title: string, list: {content: string} []}[]= [
    {title: 'Title', list: [{content: "elso"}, {content: "masodik"}, {content: "harmadik"}]},
    {title: 'Title', list: [{content: "elso"}, {content: "masodik"}, {content: "harmadik"}]}
  ];

  constructor() { }


  get members(): { title: string; list: { content: string }[] }[] {
    return this._members;
  }

  set members(value: { title: string; list: { content: string }[] }[]) {
    this._members = value;
  }
}
