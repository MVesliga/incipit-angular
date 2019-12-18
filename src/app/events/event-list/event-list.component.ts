import {Component, OnInit} from '@angular/core';
import {EventsService} from '../events.service';
import {Event} from '../../shared/Model/event.model';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  events: Event[] = [];

  constructor(private eventsService: EventsService) { }

  ngOnInit() {
    this.eventsService.fetchEvents().subscribe(events => {
      this.eventsService.setEvents(events);
      this.events = events;
    });

    this.eventsService.eventsChanged.subscribe(events => {
      this.events = events;
    });
  }


}
