import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CallbackComponent } from './pages/callback/callback.component';
import { CounselorsComponent } from './pages/counselors/counselors.component';
import { LoginComponent } from './login/login.component';
import { EventCreateComponent } from './event-create/event-create.component';
import { SearchClientsComponent } from './search-clients/search-clients.component';
import { DisplayClientsComponent } from './display-clients/display-clients.component';
import {NeedAuthGuard} from './auth.guard';
//import { CalendarComponent } from './calendar/calendar.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
//import { CreateEventComponent } from './pages/admin/create-event/create-event.component';
//import { UpdateEventComponent } from './pages/admin/update-event/update-event.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
	canActivate: [NeedAuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'callback',
    component: CallbackComponent
  },
  {
    path: 'counselors',
    component: CounselorsComponent
  },

  {
    path: 'event-create',
    component: EventCreateComponent,
    data: { title: 'Create Event' }
  },
{
    path: 'search-clients',
    component: SearchClientsComponent,
    data: { title: 'Search Clients' }
  },
{
    path: 'display-clients/:id',
    component: DisplayClientsComponent,
    data: { title: 'Display Clients' }
  },

  {
    path: 'calendar',
    component: CalendarComponent,
    data: { title: 'Calendar Event' }
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
