import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) { }

  getRandomImg(): Observable<any>  {
    debugger;
    return this.http.get(`https://cataas.com/cat`)
  }
}
