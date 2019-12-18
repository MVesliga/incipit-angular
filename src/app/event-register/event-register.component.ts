import { Component, OnInit } from '@angular/core';
import {EventsService} from '../events/events.service';
import {ActivatedRoute} from '@angular/router';
import {Event} from '../shared/Model/event.model';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Registration} from '../shared/Model/registration.model';

@Component({
  selector: 'app-register',
  templateUrl: './event-register.component.html',
  styleUrls: ['./event-register.component.css']
})
export class EventRegisterComponent implements OnInit {

  private event: Event;
  private id: number;
  eventRegisterForm: FormGroup;
  registration: Registration;

  constructor(private eventsService: EventsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.event = this.eventsService.getEvent(params['id']);
      this.id = params['id'] + 1;
    });

    this.eventRegisterForm = new FormGroup({
      'personal': new FormGroup({
        'name': new FormGroup({
          'first': new FormControl(null, Validators.required),
          'last': new FormControl(null, Validators.required)
        }),
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'phone': new FormControl(null, Validators.required),
        'education': new FormGroup({
          'faculty': new FormControl(null, Validators.required),
          'facultyYear': new FormControl(null, [Validators.required, Validators.min(1), Validators.max(5)])
        }),
        'personalSummary': new FormControl(null, Validators.required)
      }),
      'experience': new FormGroup({
        'githubUsername': new FormControl(null),
        'yearsOfExperience': new FormControl(null, [Validators.required, Validators.min(0)]),
        'experienceSummary': new FormControl(null, Validators.required),
        'skills': new FormArray([])
      }),
      'motivation': new FormControl(null, Validators.required),
      'preferredOS': new FormControl('WINDOWS', Validators.required)
    });

    this.registration = {
      personal: {
        name: {
          first: this.eventRegisterForm.get('personal.name.first').value,
          last: this.eventRegisterForm.get('personal.name.last').value
        },
        email: this.eventRegisterForm.get('personal.email').value,
        phone: this.eventRegisterForm.get('personal.phone').value,
        education: {
          facultyClass: this.eventRegisterForm.get('personal.education.faculty').value,
          year: this.eventRegisterForm.get('personal.education.facultyYear').value
        },
        summary: this.eventRegisterForm.get('personal.personalSummary').value
      },
      experience: {
        githubUsername: this.eventRegisterForm.get('experience.githubUsername').value,
        years: this.eventRegisterForm.get('experience.yearsOfExperience').value,
        summary: this.eventRegisterForm.get('experience.experienceSummary').value,
        skills: this.eventRegisterForm.get('experience.skills').value
      },
      motivation: this.eventRegisterForm.get('motivation').value,
      preferredOS: this.eventRegisterForm.get('preferredOS').value
    };

  }

  get skills() {
    return (this.eventRegisterForm.get('experience.skills') as FormArray).controls;
  }

  onAddSkill() {
    const skillControl = new FormGroup({
      'name': new FormControl(null, Validators.required)
    });

    (this.eventRegisterForm.get('experience.skills') as FormArray).push(skillControl);
  }

  onRemoveSkill(skillIndex: number) {
    (this.eventRegisterForm.get('experience.skills') as FormArray).removeAt(skillIndex);
  }

  onSubmit() {

    this.registration = {
      personal: {
        name: {
          first: this.eventRegisterForm.get('personal.name.first').value,
          last: this.eventRegisterForm.get('personal.name.last').value
        },
        email: this.eventRegisterForm.get('personal.email').value,
        phone: this.eventRegisterForm.get('personal.phone').value,
        education: {
          facultyClass: this.eventRegisterForm.get('personal.education.faculty').value,
          year: this.eventRegisterForm.get('personal.education.facultyYear').value
        },
        summary: this.eventRegisterForm.get('personal.personalSummary').value
      },
      experience: {
        githubUsername: this.eventRegisterForm.get('experience.githubUsername').value,
        years: this.eventRegisterForm.get('experience.yearsOfExperience').value,
        summary: this.eventRegisterForm.get('experience.experienceSummary').value,
        skills: this.eventRegisterForm.get('experience.skills').value
      },
      motivation: this.eventRegisterForm.get('motivation').value,
      preferredOS: this.eventRegisterForm.get('preferredOS').value
    };

    this.eventsService.registerForEvent(this.id, this.registration);
  }

}
