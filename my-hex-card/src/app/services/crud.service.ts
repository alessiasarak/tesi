import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService<T> {
  private baseApiUrl: string = "127.0.0.1:3000";
  private endpoint: string = "";

  constructor(private http: HttpClient, @Inject('endpoint') endpoint: string) {
    this.endpoint = endpoint;
  }


  provadGet(): Observable<T> {
    console.log("GEEEEET");
    return this.http.get<T>(this.baseApiUrl + this.endpoint);
  }
}
