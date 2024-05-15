import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService<T> {
  private baseApiUrl: string = "https://api.myhexcard.com";
  private endpoint: string = "";
  private headers = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(private http: HttpClient, @Inject('endpoint') endpoint: string) {
    this.endpoint = endpoint;
  }

  post(item? : T, extraEndPoint?: string) : Observable<T>{
    const body = {
      entity: item,
    }

    const options = {
      headers: this.headers
    }
    
    if(extraEndPoint) return this.http.post<T>(this.baseApiUrl + this.endpoint + extraEndPoint, body, options );
    else return this.http.post<T>(this.baseApiUrl + this.endpoint, body, options );
    
  }

  get(extraEndPoint?: string) : Observable<T>{
    const options = {
      headers: this.headers
    }

    if(extraEndPoint) return this.http.get<T>(this.baseApiUrl + this.endpoint + extraEndPoint, options);
    else return this.http.get<T>(this.baseApiUrl + this.endpoint, options);
  }

  getList(extraEndPoint?: string) : Observable<T[]>{
    const options = {
      headers: this.headers
    }

    if(extraEndPoint) return this.http.get<T[]>(this.baseApiUrl + this.endpoint + extraEndPoint, options);
    else return this.http.get<T[]>(this.baseApiUrl + this.endpoint, options);
  }

  put(item? : T, extraEndPoint?: string) : Observable<T>{
    const body = {
      entity: item,
    }

    const options = {
      headers: this.headers
    }
    
    if(extraEndPoint) return this.http.put<T>(this.baseApiUrl + this.endpoint + extraEndPoint, body, options );
    else return this.http.put<T>(this.baseApiUrl + this.endpoint, body, options );
    
  }

  delete(extraEndPoint?: string) : Observable<T>{
    const options = {
      headers: this.headers
    }

    if(extraEndPoint) return this.http.delete<T>(this.baseApiUrl + this.endpoint + extraEndPoint, options);
    else return this.http.delete<T>(this.baseApiUrl + this.endpoint, options);
  }
}
