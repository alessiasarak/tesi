import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService<T> {
  private baseApiUrl: string = "https://api.myhexcard.com";
  private endpoint: string = "";
  private headers = { "Content-Type": "application/json" };

  constructor(private http: HttpClient, @Inject('endpoint') endpoint: string) {
    this.endpoint = endpoint;
  }

  post(item? : T, extraEndPoint?: string) : Observable<T>{
    const body = {
      entity: item
    }

    
    if(extraEndPoint) return this.http.post<T>(this.baseApiUrl + this.endpoint + extraEndPoint, body, {  withCredentials: true, headers: this.headers } );
    else return this.http.post<T>(this.baseApiUrl + this.endpoint, body, {  withCredentials: true, headers: this.headers, } );
    
  }

  get(extraEndPoint?: string) : Observable<T>{
    console.log(this.baseApiUrl + this.endpoint + extraEndPoint)
    if(extraEndPoint) return this.http.get<T>(this.baseApiUrl + this.endpoint + extraEndPoint, {  withCredentials: true, headers: this.headers });
    else return this.http.get<T>(this.baseApiUrl + this.endpoint, {  withCredentials: true, headers: this.headers });
  }

  getList(extraEndPoint?: string) : Observable<T[]>{
    

    if(extraEndPoint) return this.http.get<T[]>(this.baseApiUrl + this.endpoint + extraEndPoint, {  withCredentials: true, headers: this.headers });
    else return this.http.get<T[]>(this.baseApiUrl + this.endpoint, {  withCredentials: true, headers: this.headers });
  }

  put(item? : T, extraEndPoint?: string, extraElement? : string) : Observable<T>{
    const body = {
      entity: item,
      extra: extraElement
    }

    
    
    if(extraEndPoint) return this.http.put<T>(this.baseApiUrl + this.endpoint + extraEndPoint, body, {  withCredentials: true, headers: this.headers } );
    else return this.http.put<T>(this.baseApiUrl + this.endpoint, body, {  withCredentials: true, headers: this.headers } );
    
  }

  delete(extraEndPoint?: string) : Observable<T>{
    if(extraEndPoint) return this.http.delete<T>(this.baseApiUrl + this.endpoint + extraEndPoint, {  withCredentials: true, headers: this.headers });
    else return this.http.delete<T>(this.baseApiUrl + this.endpoint, {  withCredentials: true, headers: this.headers });
  }
}
