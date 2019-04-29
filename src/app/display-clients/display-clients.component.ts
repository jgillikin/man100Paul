import { Component, OnInit } from '@angular/core';
import { Router,Routes,RouterModule,ActivatedRoute } from '@angular/router';
import { ApiService } from '../core/api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms'
import {Event} from '../models/events';
import { Response } from '@angular/http';

@Component({
  selector: 'app-display-clients',
  templateUrl: './display-clients.component.html',
  styleUrls: ['./display-clients.component.scss']
})
export class DisplayClientsComponent implements OnInit {
	
bookForm: FormGroup;
event1: Event;
errorMessage: String;
categories = [];
categories2 = [];
messages: String;
msg = [];
counselors: String;
couns = [];
msgDates: String;
msgDate = [];
senders: String;
sender = [];
id: number;
private sub: any;
client: String;

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder,public route: ActivatedRoute) {

 this.api.getSearchClients(this.route.snapshot.paramMap.get('id')).subscribe(data2 => { 
		
		console.log('data2 lenght is '+data2.length);
		
		for (var i=0;i<data2.length;i++) {
			
			/*
			this.messages = data2[i].msg;
			this.counselors = data2[i].counselor;
			this.msgDates = data2[i].msgDate;
			this.senders = data2[i].sender2;
		*/

		//console.log('messages are '+data2[i].msg);
		
this.msg = data2[i].msg.toString().split(',');
this.couns = data2[i].counselor.toString().split(',');
this.msgDate = data2[i].msgDate.toString().split(',');
this.sender = data2[i].sender2.toString().split(',');
		
		
		}
		
		console.log('msg size is '+this.msg.length);
	
	
	    this.client = this.route.snapshot.paramMap.get('id');

/*
		this.msg.push(this.messages.toString().split(','));

		this.couns.push(this.counselors.toString().split(','));

		this.msgDate.push(this.msgDates.toString().split(','));

		this.sender.push(this.senders.toString().split(','));
*/

		for (var j=0;j<this.couns.length;j++) 
		{
			this.categories2.push([this.couns[j],this.msg[j],this.msgDate[j],this.sender[j]]);
		}
		
		console.log('categories2 length is '+this.categories2.length);
		//this.categories2 = data2;
		
		
		});
  
  }

  ngOnInit() {
	  
	   console.log('pass in is '+this.route.snapshot.paramMap.get('id'));
	   
  }

}
