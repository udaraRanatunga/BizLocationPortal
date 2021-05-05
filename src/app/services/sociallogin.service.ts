import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SocialloginService {

  url;
  constructor(private http: HttpClient) { }

  Savesresponse(responce) {
    this.url = 'http://localhost:64726/Api/Login/Savesresponse';
    return this.http.post(this.url, responce);
  }
  getUsers() {
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('content-type', 'application-json');
    return this.http.get('https://jsonplaceholder.typicode.com/users', {headers: httpHeaders});
  }
}
