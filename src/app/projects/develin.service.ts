import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DevelinService {
  public isUserManagerOpen = false;

  constructor() { }
}
