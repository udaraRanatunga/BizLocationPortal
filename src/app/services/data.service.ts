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
  getColomboZoneById(id) {
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('content-type', 'application-json');
    const url = 'http://localhost:8080/api/colomboZone/' + id;
    return this.http.get(url, {headers: httpHeaders});
  }
  getBusinessType() {
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('content-type', 'application-json');
    return this.http.get('http://localhost:8080/api/businessType', {headers: httpHeaders});
  }
  getTargetGroups() {
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('content-type', 'application-json');
    return this.http.get('http://localhost:8080/api/targetGroup', {headers: httpHeaders});
  }
  getPriceRange() {
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('content-type', 'application-json');
    return this.http.get('http://localhost:8080/api/priceRange', {headers: httpHeaders});
  }
  getBusinessGoals() {
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('content-type', 'application-json');
    return this.http.get('http://localhost:8080/api/businessGoal', {headers: httpHeaders});
  }
  saveUser(colomboZoneId, businessTypeId, priceRangeId, targetGroupId, body) {
  const httpHeaders = new HttpHeaders();
  httpHeaders.append('content-type', 'application-json');
    // tslint:disable-next-line:max-line-length
  return this.http.post('http://localhost:8080/api/user/' + colomboZoneId + '/' + businessTypeId + '/' + priceRangeId + '/' + targetGroupId, body, {headers: httpHeaders});
}
  getColomboZoneByZoneNumber(zone) {
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('content-type', 'application-json');
    const url = 'http://localhost:8080/api/colomboZone/zone/' + zone;
    return this.http.get(url, {headers: httpHeaders});
  }
  getCuisineDataByZone(zone) {
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('content-type', 'application-json');
    const url = 'http://localhost:8080/api/topCuisines/colomboZone/' + zone;
    return this.http.get(url, {headers: httpHeaders});
  }
  getColomboZoneByBudget(priceRangeId) {
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('content-type', 'application-json');
    const url = ' http://localhost:8080/api/colomboZone/budget/' + priceRangeId;
    return this.http.get(url, {headers: httpHeaders});
  }
  getCompetitorsByZone(zoneId) {
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('content-type', 'application-json');
    const url = 'http://localhost:8080/api/restaurant/colomboZone/' + zoneId;
    return this.http.get(url, {headers: httpHeaders});
  }
}
