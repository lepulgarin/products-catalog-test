import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedAuthService {
  private emitLoginSource = new Subject<any>();
  loginEmitted$ = this.emitLoginSource.asObservable();
  emitLogin(data: any) {
    this.emitLoginSource.next(data);
  }
  constructor() {}
}
