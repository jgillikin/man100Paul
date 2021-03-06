import { Component, OnInit } from '@angular/core';
import { Router,Routes,RouterModule } from '@angular/router';
import { ApiService } from '../core/api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms'
import {Event} from '../models/events';
import { Response } from '@angular/http';
import {Observable} from 'rxjs'
import {switchMap, debounceTime} from 'rxjs/operators';
import {IUserResponse} from '../models/user';

@Component({
  selector: 'app-search-clients',
  templateUrl: './search-clients.component.html',
  styleUrls: ['./search-clients.component.scss']
})
export class SearchClientsComponent implements OnInit {
	
bookForm: FormGroup;
filteredUsers: Observable<IUserResponse>;
event1: Event;
errorMessage: String;
categories = [];
public placeholder: string = 'Enter Client Phone Number';
public keyword = 'name';
public historyHeading: string = 'Recently selected';
public countriesTemplate = [];

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
	  
	  this.bookForm = this.formBuilder.group({
    'counselor' : [null, Validators.required],
    'cellnum' : [null, Validators.required],
	'lastActiveNum' : '',
	'lastActiveId' : '',
	'viewPublic': true
  });
  
   
  
  }
  
  onFormSubmit(form: any) {
	console.log('pass to display-clients '+form.counselor);

	/*
	this.api.getSearchClients(form)  
  .subscribe(data =>  {  console.log('data is '+data.data);  
		this.router.navigate([""]);
  }   
  , error => this.errorMessage = error ); 
  */
  
  this.router.navigate(["display-clients", form.counselor]);
  
    
	  
  }
	  

}
