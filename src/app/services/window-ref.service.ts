import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowRefService {
  get windowRef() {
    return window
  }

  constructor() { }
}
