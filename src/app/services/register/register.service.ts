import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  signIn(registerData: any) {
    console.log('register');

    return this.http
      .post<any>(environment.API_URL + '/sign-in', registerData)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
}
