import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService<T> {
  private baseApiUrl: string = "http://127.0.0.1:3000";
  private endpoint: string = "";
  private headers = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(private http: HttpClient, @Inject('endpoint') endpoint: string) {
    this.endpoint = endpoint;
  }

  post(item : T, extraEndPoint?: string) : Observable<T>{
    const body = {
      entity: item,
    }

    const options = {
      headers: this.headers
    }

    return this.http.post<T>(this.baseApiUrl + this.endpoint + extraEndPoint, body, options );
  }
}
