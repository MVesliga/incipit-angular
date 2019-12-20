import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Registration} from '../shared/Model/registration.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrationsService {

  headers = new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  });

  constructor(private http: HttpClient) {
  }

  getRegistration(eventId: number, registrationUUID: string) {
    return this.http.get<Registration>('http://localhost:8080/event/' + eventId + '/registrations/' + registrationUUID, {headers: this.headers});
  }
}
