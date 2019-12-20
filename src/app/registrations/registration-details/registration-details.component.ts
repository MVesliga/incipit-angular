import { Component, OnInit } from '@angular/core';
import {Registration} from '../../shared/Model/registration.model';
import {RegistrationsService} from '../registrationsService';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-registration-details',
  templateUrl: './registration-details.component.html',
  styleUrls: ['./registration-details.component.css']
})
export class RegistrationDetailsComponent implements OnInit {

  registration: Registration;
  eventId: number;
  registrationUUID: string;

  constructor(private registrationsService: RegistrationsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.eventId = +params['id'];
      this.registrationUUID = params['registrationUUID'];

      this.registrationsService.getRegistration((this.eventId + 1), this.registrationUUID).subscribe(registration => {
        /*this.registration = registration;*/
        console.log(registration);
      });
    })
  }


}
