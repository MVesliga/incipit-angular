import { Component, OnInit } from '@angular/core';
import {Event} from '../../shared/Model/event.model';
import {EventsService} from '../events.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  event: Event;
  id: number;

  constructor(private eventsService: EventsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.event = this.eventsService.getEvent(this.id);
      }
    );
  }

}
