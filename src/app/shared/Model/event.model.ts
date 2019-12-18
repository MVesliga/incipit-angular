import {Team} from './team.model';

export interface Event {
  name: string;
  maxParticipants: number;
  startDate: any;
  endDate: any;
  registrationsNotBefore: any;
  registrationsNotAfter: any;
  confirmationsNotAfter: any;
  teams?: Team[];
}
