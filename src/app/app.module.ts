import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {KeycloakService} from './keycloak.service';
import { EventRegisterComponent } from './event-register/event-register.component';
import {AuthGuard} from './auth-guard.service';
import { NotRegisteredComponent } from './not-registered/not-registered.component';
import {AppRoutingModule} from './app-routing.module';
import { EventsComponent } from './events/events.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
/*import {AuthInterceptorService} from './auth-interceptor.service';*/
import { EventListComponent } from './events/event-list/event-list.component';
import { EventItemComponent } from './events/event-list/event-item/event-item.component';
import { EventDetailsComponent } from './events/event-details/event-details.component';
import {DropdownDirective} from './shared/dropdown.directive';
import { AddEventComponent } from './events/add-event/add-event.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CanDeactivateGuard} from './events/add-event/can-deactivate-guard.service';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

export function kcFactory(keycloakService: KeycloakService) {
  return () => keycloakService.init();
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    AboutComponent,
    NotFoundComponent,
    EventRegisterComponent,
    NotRegisteredComponent,
    EventsComponent,
    EventListComponent,
    EventItemComponent,
    EventDetailsComponent,
    DropdownDirective,
    AddEventComponent
  ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      ReactiveFormsModule,
      OwlDateTimeModule,
      OwlNativeDateTimeModule,
      BrowserAnimationsModule
    ],
  providers: [
    KeycloakService,
    {
      provide: APP_INITIALIZER,
      useFactory: kcFactory,
      deps: [KeycloakService],
      multi: true
    },
    AuthGuard,
    CanDeactivateGuard/*,
    [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}]*/
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
