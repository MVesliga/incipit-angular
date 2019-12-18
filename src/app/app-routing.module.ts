import {NgModule} from '@angular/core';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {EventRegisterComponent} from './event-register/event-register.component';
import {AuthGuard} from './auth-guard.service';
import {NotRegisteredComponent} from './not-registered/not-registered.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {RouterModule} from '@angular/router';
import {EventsComponent} from './events/events.component';
import {EventDetailsComponent} from './events/event-details/event-details.component';
import {AddEventComponent} from './events/add-event/add-event.component';
import {EventListComponent} from './events/event-list/event-list.component';
import {CanDeactivateGuard} from './events/add-event/can-deactivate-guard.service';
import {EventsResolverService} from './events/events-resolver.service';

const appRoutes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'events', children: [
      {path: 'show', component: EventListComponent},
      {path: 'add', component: AddEventComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard]},
      {path: 'show/:id', component: EventDetailsComponent, resolve: [EventsResolverService]},
      {path: 'show/:id/register', component: EventRegisterComponent, canActivate: [AuthGuard], resolve: [EventsResolverService]},
    ]},
  {path: 'not-registered', component: NotRegisteredComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
