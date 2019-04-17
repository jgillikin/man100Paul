import { Component, OnInit } from '@angular/core';
import { Router,Routes,RouterModule } from '@angular/router';
import { ApiService } from '../core/api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms'
import {Event} from '../models/events';
import { Response } from '@angular/http';


@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.scss']
})
export class EventCreateComponent implements OnInit {

bookForm: FormGroup;
event1: Event;
errorMessage: String;

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
	console.log('call saveCounselor ');

	//form.viewPublic=true;
	this.api.saveCounselor(form)  
  .subscribe(data =>  {  console.log(data.data);  
       
        //this.router.navigate(['calendar', 'calendar']);
		this.router.navigate([""]);
  }   
  , error => this.errorMessage = error ); 
	  
	  }

}
