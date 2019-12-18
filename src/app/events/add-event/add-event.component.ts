/* tslint:disable:object-literal-key-quotes */
import {Component, OnInit} from '@angular/core';
import {Form, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Event} from '../../shared/Model/event.model';
import {EventsService} from '../events.service';
import {CanDeactivate, Router} from '@angular/router';
import {CanComponentDeactivate} from './can-deactivate-guard.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit, CanComponentDeactivate {
  eventForm: FormGroup;
  event: Event;
  changesSaved = false;

  constructor(private eventsService: EventsService, private router: Router) {
  }

  ngOnInit() {
    this.eventForm = new FormGroup({
      'eventData': new FormGroup({
        'eventName': new FormControl(null, Validators.required),
        'maxParticipants': new FormControl(null, [Validators.required, Validators.min(1)]),
        'startDate': new FormControl(null, [Validators.required, this.beforeTodaysDate.bind(this)]),
        'endDate': new FormControl(null, [Validators.required, this.beforeTodaysDate.bind(this)]),
        'registrationsNotBefore': new FormControl(null, [Validators.required, this.beforeTodaysDate.bind(this)]),
        'registrationsNotAfter': new FormControl(null, [Validators.required, this.beforeTodaysDate.bind(this)]),
        'confirmationsNotAfter': new FormControl(null, [Validators.required, this.beforeTodaysDate.bind(this)])
      }),
      'teamsData': new FormGroup({
        'teams': new FormArray([])
      })
    });

    this.event = {
      name: undefined,
      maxParticipants: 0,
      startDate: undefined,
      endDate: undefined,
      registrationsNotBefore: undefined,
      registrationsNotAfter: undefined,
      confirmationsNotAfter: undefined
    };
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if ((this.event.name !== this.eventForm.get('eventData.eventName').value ||
    this.event.maxParticipants !== this.eventForm.get('eventData.maxParticipants').value ||
      this.event.startDate !== this.eventForm.get('eventData.startDate').value ||
      this.event.endDate !== this.eventForm.get('eventData.endDate').value ||
      this.event.registrationsNotBefore !== this.eventForm.get('eventData.registrationsNotBefore').value ||
      this.event.registrationsNotAfter !== this.eventForm.get('eventData.registrationsNotAfter').value ||
      this.event.confirmationsNotAfter !== this.eventForm.get('eventData.confirmationsNotAfter').value) && !this.changesSaved) {
      return confirm('Do you want to discard the changes?');
    } else {
      return true;
    }
  }

  onSubmit() {
    this.event = {
      name: this.eventForm.get('eventData.eventName').value,
      maxParticipants: this.eventForm.get('eventData.maxParticipants').value,
      startDate: this.eventForm.get('eventData.startDate').value,
      endDate: this.eventForm.get('eventData.endDate').value,
      registrationsNotBefore: this.eventForm.get('eventData.registrationsNotBefore').value,
      registrationsNotAfter: this.eventForm.get('eventData.registrationsNotAfter').value,
      confirmationsNotAfter: this.eventForm.get('eventData.confirmationsNotAfter').value,
      teams: this.eventForm.get('teamsData.teams').value
    };

    this.eventsService.createEvent(this.event);
    this.changesSaved = true;
  }

  onAddTeam() {
    const teamGroup = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'mentors': new FormArray([])
    });
    (this.eventForm.get('teamsData.teams') as FormArray).push(teamGroup);
  }

  onRemoveTeam(index: number) {
    (this.eventForm.get('teamsData.teams') as FormArray).removeAt(index);
  }

  onAddMentor(teamIndex: number) {
    const mentorGroup = new FormGroup({
        'name': new FormGroup({
          'first': new FormControl(null, Validators.required),
          'last': new FormControl(null, Validators.required)
        }),
        'email': new FormControl(null, [Validators.required, Validators.email])
      }
    );

    ((this.eventForm.get('teamsData.teams') as FormArray).controls[teamIndex].get('mentors') as FormArray).push(mentorGroup);
  }

  onRemoveMentor(teamIndex: number, mentorIndex: number) {
    ((this.eventForm.get('teamsData.teams') as FormArray).controls[teamIndex].get('mentors') as FormArray).removeAt(mentorIndex);
  }

  get teams() {
    return (this.eventForm.get('teamsData.teams') as FormArray).controls;
  }

  getTeam(teamIndex: number) {
    return (this.eventForm.get('teamsData.teams') as FormArray).controls[teamIndex];
  }

  getMentors(teamIndex: number) {
    return ((this.eventForm.get('teamsData.teams') as FormArray).controls[teamIndex].get('mentors') as FormArray).controls;
  }

  getMentor(teamIndex: number, mentorIndex: number) {
    return ((this.eventForm.get('teamsData.teams') as FormArray).controls[teamIndex].get('mentors') as FormArray).controls[mentorIndex];
  }

  beforeTodaysDate(control: FormControl): { [s: string]: boolean } {
    const currentDate = new Date();
    this.setTimetoZero(currentDate);
    const selectedDate = new Date(control.value);
    this.setTimetoZero(selectedDate);

    if (selectedDate < currentDate) {
      return {'dateIsBeforeError': true};
    }

    return null;
  }

  afterTodaysDate(control: FormControl): { [s: string]: boolean } {
    const currentDate = new Date();
    this.setTimetoZero(currentDate);
    const selectedDate = new Date(control.value);
    this.setTimetoZero(selectedDate);

    if (selectedDate > currentDate) {
      return {'dateIsAfterError': true};
    }

    return null;
  }

  setTimetoZero(date: Date) {
    date.setSeconds(0);
    date.setMinutes(0);
    date.setHours(0);
    date.setMilliseconds(0);
  }
}
