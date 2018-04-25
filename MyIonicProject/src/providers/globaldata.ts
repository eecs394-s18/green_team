import { Injectable } from '@angular/core';

@Injectable()
export class GlobalData {
  /*
  - filters is null if the user hasn't searched up any filters at all
  - filters is {} if the user has searched up, but clicked "show all"
  - filters is {...} if the user has searched up, but with filters
  */
  private static filters: any;

  static init() {
    console.log('initialize all global data to default values')
    this.filters = null;
  }
  static setFilters(obj) {
    this.filters = (obj == null ? {} : obj);
  }
  static getFilters() {
    return this.filters;
  }
}
