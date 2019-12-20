import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Event} from '../shared/Model/event.model';
import {Router} from '@angular/router';
import {map, tap} from 'rxjs/operators';
import {Registration} from '../shared/Model/registration.model';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  eventsChanged = new Subject<Event[]>();
  private events: Event[] = [];
  headers = new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  });

  constructor(private http: HttpClient, private router: Router) {
  }


  setEvents(events: Event[]) {
    this.events = events;
    this.eventsChanged.next(this.events.slice());
  }

  getEvent(index: number) {
    return this.events[index];
  }

  fetchEvents() {
    return this.http.get<Event[]>('http://localhost:8080/event').pipe(
      map(events => {
        return events.map(event => {
          return {
            ...event,
            teams: event.teams ? event.teams : []
          };
        });
      }),
      tap(events => {
        this.setEvents(events);
      })
    );
  }

  createEvent(event: Event) {
    this.http.post<HttpResponse<any>>('http://localhost:8080/event', event, {
      headers: this.headers,
      observe: 'response'
    }).subscribe((response: HttpResponse<any>) => {
      this.eventsChanged.next(this.events.slice());
      alert('Event ' + event.name + ' was successfully added!');
      console.log(response);
      this.router.navigate([response.headers.get('Location')]);
    }, (error: HttpErrorResponse) => {
      console.log(error);
      if (error.status === 403) {
        alert('You don\'t have permission to add an event!');
      }
      if (error.status === 400) {
        alert(error.error.defaultMessage);
      }
    });
  }

  registerForEvent(eventId: number, registration: Registration) {
    this.http.post<string>('http://localhost:8080/event/' + eventId.toString() + '/registrations', registration, {
      headers: this.headers,
      responseType: 'text'
    }).subscribe(response => {
      alert('User ' + registration.personal.name.first + ' successfully registered!');
      console.log(response);
      this.router.navigate([response])
    }, (error: HttpErrorResponse) => {
      console.log(error);
      if (error.status === 404) {
        alert(error.error);
      }
      if (error.status === 405) {
        alert(error.error);
      }
    });
  }
}
