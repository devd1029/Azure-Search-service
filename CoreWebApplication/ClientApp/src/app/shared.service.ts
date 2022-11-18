import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class SharedService {
  readonly ApiUrl: string = "https://localhost:44340/api";
  constructor(private httpClient: HttpClient) { }

  GetLanguageList():Observable<any[]> {
    return this.httpClient.get<any>(this.ApiUrl + '/language');
  }

  AddLanguage(val:any): Observable<any[]> {
    return this.httpClient.post<any>(this.ApiUrl + '/language', val);
  }

  UpdateLanguage(val: any): Observable<any[]> {
    return this.httpClient.put<any>(this.ApiUrl + '/language', val);
  }

  GetProducts(): Observable<any[]> {
    return this.httpClient.get<any>(this.ApiUrl+'product');
  }

}
