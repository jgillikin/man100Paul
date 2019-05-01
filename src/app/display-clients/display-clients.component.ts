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
test = [];
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
				
		for (var i=0;i<data2.length;i++) {
			
			/*
			this.messages = data2[i].msg;
			this.counselors = data2[i].counselor;
			this.msgDates = data2[i].msgDate;
			this.senders = data2[i].sender2;
		*/

		//console.log('messages are '+data2[i].msg);
		var d = new Date(data2[i].msgDate[0]);
		
		console.log('date format is '+d);
		
this.msg = data2[i].msg.toString().split(',');
this.couns = data2[i].counselor.toString().split(',');
this.msgDate = data2[i].msgDate.toString().split(',');
this.sender = data2[i].sender2.toString().split(',');
		
		}
		
	
	    this.client = this.route.snapshot.paramMap.get('id');

/*
		this.msg.push(this.messages.toString().split(','));

		this.couns.push(this.counselors.toString().split(','));

		this.msgDate.push(this.msgDates.toString().split(','));

		this.sender.push(this.senders.toString().split(','));
*/

		for (var j=0;j<this.couns.length;j++) 
		{
			//this.categories2.push([this.couns[j],this.msg[j],this.msgDate[j],this.sender[j]]);
		   // this.categories2.push(['Counselor:  '+this.couns[j]+'  |  Message:  '+this.msg[j]+'  |  Date:  '+this.msgDate[j]+'  |  Sender:  '+this.sender[j]]);
			
			this.test.push(
			{Counselor: this.couns[j],Message: this.msg[j],MessageDate: this.msgDate[j], Sender: this.sender[j]}
			);
		}
		
		//this.categories2 = data2;
				
		});
  
  }

  ngOnInit() {
	  
	   console.log('pass in is '+this.route.snapshot.paramMap.get('id'));
	   
  }

}
