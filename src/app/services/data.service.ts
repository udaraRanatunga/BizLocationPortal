import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }
  getColomboZone() {
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('content-type', 'application-json');
    return this.http.get('http://localhost:8080/api/colomboZone', {headers: httpHeaders});
  }
  getColomboZoneById(id){
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('content-type', 'application-json');
    const url = 'http://localhost:8080/api/colomboZone/' + id;
    return this.http.get(url, {headers: httpHeaders});
  }
}
