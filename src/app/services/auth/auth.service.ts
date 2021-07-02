import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  logIn(loginData: any) {
    return this.http.post<any>(environment.API_URL + '/login', loginData).pipe(
      map((res) => {
        return res;
      })
    );
  }
  setToken(key: string, value: any): void {
    localStorage.setItem(key, value);
  }
  setUser(key: string, value: object): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  isAuthenticated(): boolean {
    const isLogged = localStorage.getItem('isLogged');
    if (isLogged === 'true') return true;
    return false;
  }
  getUser(): any {
    var user = localStorage.getItem('user');
    console.log('user :>> ', user);
    return user;
  }
}
