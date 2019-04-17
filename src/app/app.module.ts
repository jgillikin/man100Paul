import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AuthService } from './auth/auth.service';
import { CallbackComponent } from './pages/callback/callback.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './core/api.service';
import { LoadingComponent } from './core/loading.component';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UtilsService } from './core/utils.service';
import { FilterSortService } from './core/filter-sort.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { CreateEventComponent } from './pages/admin/create-event/create-event.component';
//import { UpdateEventComponent } from './pages/admin/update-event/update-event.component';
import { EventFormComponent } from './pages/admin/event-form/event-form.component';
import { EventCreateComponent } from './event-create/event-create.component';
import {
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule } from '@angular/material';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
//import { CalendarComponent } from './calendar/calendar.component';   
//from './pages/home/home.component';
import { CalendarComponent } from './pages/calendar/calendar.component';   
import { CommonModule } from '@angular/common';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal/modal.component';
import { ModalService } from './modal/modal.service';
import { SearchClientsComponent } from './search-clients/search-clients.component';
import { DisplayClientsComponent } from './display-clients/display-clients.component';
import { CounselorsComponent } from './pages/counselors/counselors.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    CallbackComponent,
    LoadingComponent,
   // CreateEventComponent,
   // UpdateEventComponent,
    EventFormComponent,
   EventCreateComponent,
   CalendarComponent,
   ModalComponent,
   SearchClientsComponent,
   DisplayClientsComponent,
   CounselorsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
	 CommonModule,
	 NgbModalModule,
    FlatpickrModule.forRoot()
  ],
  providers: [Title,ModalService,AuthService,ApiService,DatePipe,UtilsService,FilterSortService],
  bootstrap: [AppComponent]
})
export class AppModule { }
