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
msg: String;
counselors: String;
couns: String;
msgDates: String;
msgDate: String;
senders: String;
sender: String;
id: number;
private sub: any;
client: String;

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder,public route: ActivatedRoute) {

 this.api.getSearchClients(this.route.snapshot.paramMap.get('id')).subscribe(data2 => { 
		
		
		for (var i=0;i<data2.length;i++) {
			//console.log('msg is '+data2[i].msg);
			this.messages = data2[i].msg;
			this.counselors = data2[i].counselor;
			this.msgDates = data2[i].msgDate;
			this.senders = data2[i].sender2;
			//this.categories[i] = data2[i].counselor+ '           '+data2[i].msg;
			//console.log('msg is '+data2[i].msg(i));
		}
	
	
	    this.client = this.route.snapshot.paramMap.get('id');
		this.msg = this.messages.toString().split(',');
		this.couns = this.counselors.toString().split(',');
		this.msgDate = this.msgDates.toString().split(',');
		this.sender = this.senders.toString().split(',');
		//console.log('msg length is '+this.msg.length+this.msg[0]);

		for (var j=0;j<this.couns.length;j++) 
		{
			this.categories2.push([this.couns[j],this.msg[j],this.msgDate[j],this.sender[j]]);
		}
		
		console.log('categories2 length is '+this.categories2[0]);
		//this.categories2 = data2;
		
		
		});
  
  }

  ngOnInit() {
	  
	   console.log('pass in is '+this.route.snapshot.paramMap.get('id'));
	   
  }

}
