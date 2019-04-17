import { Component, OnInit } from '@angular/core';
import { Router,Routes,RouterModule } from '@angular/router';
import { ApiService } from '../core/api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms'
import {Event} from '../models/events';
import { Response } from '@angular/http';

@Component({
  selector: 'app-search-clients',
  templateUrl: './search-clients.component.html',
  styleUrls: ['./search-clients.component.scss']
})
export class SearchClientsComponent implements OnInit {
	
	bookForm: FormGroup;
event1: Event;
errorMessage: String;
categories = [];

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
  
  onFormSubmit(form: NgForm) {
	console.log('pass to display-clients 'form.counselor);

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
