// src/app/core/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { AuthService } from './../auth/auth.service';
import { throwError as ObservableThrowError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ENV } from './env.config';
import { EventModel } from './models/event.model';
import { Event } from './models/events';
import { LoginResultModel } from './models/LoginResultModel';
import { RsvpModel } from './models/rsvp.model';
import { HandleError } from './service-helper';
import { map } from 'rxjs/operators';
import { Response } from '@angular/http';


@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  private get _authHeader(): string {
    return `Bearer ${this.auth.accessToken}`;
  }

  // GET list of public, future events
  getEvents$(): Observable<EventModel[]> {
    return this.http
      .get<EventModel[]>(`${ENV.BASE_API}events`)
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }
  
  get2(): Promise<Event[]>{
       return this.http
      .get<Event[]>(`${ENV.BASE_API}events`)
      .toPromise();
	 // .catch(HandleError);
    }
	
	postEventMan(event: Event): Observable<EventModel> {
	  console.log('in api.js '+event);
    return this.http
      .post<Event>(`${ENV.BASE_API}event/new`, event, {
      //  headers: new HttpHeaders().set('Authorization', this._authHeader)
	  
      })
      .pipe(
        catchError((error) => this._handleError(error))
      );
	 
  }
  
  // GET list of public, future events
  getEvents4(): Observable<Event[]> {
    return this.http
      .get<Event[]>('https://steadfast-quotation.glitch.me/api/getUser')
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }

//get all current counselors
getCurrentCounselors(): Observable<Event[]> {
    return this.http
      .get<Event[]>('https://steadfast-quotation.glitch.me/api/getCounselor')
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }

  
   // GET list of counselors
  getCounselors(): Observable<Event[]> {
    return this.http
      .get<Event[]>('https://steadfast-quotation.glitch.me/api/getClientSearch')
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }
  
  //get list of clientSearch
  getClients(): Observable<Event[]> {
    return this.http
      .get<Event[]>('https://steadfast-quotation.glitch.me/api/getClients')
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }
  
   // GET list of counselors
  getSearchClients(user) {
	  
	  console.log('in getSearchClients look for client '+user);
      if (user) {
		  
	  let params = new HttpParams();
       params = params.append("clientSearch", user);
  
  
    return this.http.get('https://steadfast-quotation.glitch.me/api/getClientSearch/'+user)
	        .pipe(
			  catchError((error) => this._handleError(error))
             );	
			 
	  } 
  }
  
  saveUser(user){  

  user.text = user.counselor;
  //user.text = user.selectedCategory;
  //user.counselor = user.selectedCategory;
  
 
  
  if (user.start_date.indexOf('T') !== -1) 
   user.start_date = user.start_date.replace('T', ' ');

  if (user.end_date.indexOf('T') !== -1) 
    user.end_date = user.end_date.replace('T', ' ');
 
    console.log('in saveUser and start_date is '+user.start_date+' and end_date is '+user.end_date);
  
    return this.http.post('https://steadfast-quotation.glitch.me/api/SaveUser', user)  
            .pipe(
			  map(res => res ) 
             );			  
  }
  
  saveCounselor(user){  
  
  user.lastActiveNum = user.cellnum;

  console.log('call saveCounselor and user text is '+user.counselor);
  
    return this.http.post('https://steadfast-quotation.glitch.me/api/SaveCounselor', user)  
            .pipe(
			  map(res => res ) 
             );			  
  }

login(email: string, password: string): Observable<LoginResultModel>{
    return this.http.post<LoginResultModel>('https://steadfast-quotation.glitch.me/api/login', {
      email: email,
      password: password
    });
}
  
  editUser(ev:string) {
	  
  //user.text = user.counselor;
  console.log('call EditUser and ev is '+ev);
  // user.start_date = user.start_date.replace('T', ' ');
  //user.end_date = user.end_date.replace('T', ' ');
  let params = new HttpParams();
  params = params.append("ev", ev);
  
  
    return this.http.post('https://steadfast-quotation.glitch.me/api/EditUser', params)
	        .pipe(
			  map((response: Response) =>response.json()) 
             );	
	  
  }
  
  deleteUser (ev:string) {
	  
	  let params = new HttpParams();
  params = params.append("ev", ev);
	  
	  return this.http.post('https://steadfast-quotation.glitch.me/api/deleteUser', params)
	        .pipe(
			  map((response: Response) =>response.json()) 
             );	
  }

deleteEvent$(id){   
    return this.http.post('https://steadfast-quotation.glitch.me/api/deleteUser/',{'id': id})  
            .pipe(
			  map((response: Response) =>response.json())        
             );			  
  }    
  

  // GET all events - private and public (admin only)
  getAdminEvents$(): Observable<EventModel[]> {
    return this.http
      .get<EventModel[]>(`${ENV.BASE_API}events/admin`, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }

  // GET an event by ID (login required)
  getEventById$(id: string): Observable<EventModel> {
    return this.http
      .get<EventModel>(`${ENV.BASE_API}event/${id}`, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }

  // GET RSVPs by event ID (login required)
  getRsvpsByEventId$(eventId: string): Observable<RsvpModel[]> {
    return this.http
      .get<RsvpModel[]>(`${ENV.BASE_API}event/${eventId}/rsvps`, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }
  
  

// POST new event (admin only)
  postEvent$(event: EventModel): Observable<EventModel> {
	  console.log('in api.js');
    return this.http
      .post<EventModel>(`${ENV.BASE_API}event/new`, event, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }

  // PUT existing event (admin only)
  editEvent$(id: string, event: EventModel): Observable<EventModel> {
    return this.http
      .put<EventModel>(`${ENV.BASE_API}event/${id}`, event, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }


  private _handleError(err: HttpErrorResponse | any): Observable<any> {
    const errorMsg = err.message || 'Error: Unable to complete request.';
    if (err.message && err.message.indexOf('No JWT present') > -1) {
      this.auth.login();
    }
    return ObservableThrowError(errorMsg);
  }

}