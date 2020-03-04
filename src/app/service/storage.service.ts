import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  write(key: string, value: any) {
    if (value) {
      value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
  }

  read(key: string) {
    let value: string = localStorage.getItem(key);

    if (value && value != "undefined" && value != "null") {
      return value;
      // return <T>JSON.parse(value);
    }
    return null;
  }

  sessionWrite(key: string, value: any) {
    if (value) {
      value = JSON.stringify(value);
    }
    sessionStorage.setItem(key, value);
  }

  sessionRead<T>(key: string): T {
    let value: string = sessionStorage.getItem(key);

    if (value && value != "undefined" && value != "null") {
      return <T>JSON.parse(value);
    }

    return null;
  }
}
