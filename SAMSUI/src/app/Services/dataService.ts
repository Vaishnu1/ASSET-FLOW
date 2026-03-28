import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();
  private messageSource1 = new BehaviorSubject('default message1');
  currentMessage1 = this.messageSource1.asObservable();

  constructor() { }

  changeMessage(message: any) {
    this.messageSource.next(message)
  }
  changeMessage1(message: any) {
    this.messageSource1.next(message)
  }

}