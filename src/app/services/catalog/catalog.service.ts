import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  constructor(private http: HttpClient) {}

  getCatalog(params?: any) {
    return this.http
      .get<any>(environment.API_URL + '/catalog', {
        params: params,
      })
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
}
