import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Event} from '../shared/Model/event.model';
import {Observable} from 'rxjs';
import {EventsService} from './events.service';

@Injectable({
  providedIn: 'root'
})
export class EventsResolverService implements Resolve<Event[]> {

  constructor(private eventsService: EventsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Event[]> | Promise<Event[]> | Event[] {
    return this.eventsService.fetchEvents();
  }
}
