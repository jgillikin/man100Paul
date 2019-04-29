import { Component, OnInit } from '@angular/core';
import { Router,Routes,RouterModule,ActivatedRoute } from '@angular/router';
import { ApiService } from '../../core/api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms'
import {Event} from '../../models/events';
import { Response } from '@angular/http';

@Component({
  selector: 'app-counselors',
  templateUrl: './counselors.component.html',
  styleUrls: ['./counselors.component.scss']
})
export class CounselorsComponent implements OnInit {

bookForm: FormGroup;
event1: Event;
errorMessage: String;
counselors = [];
couns: String;
coun = [];
cellnums: String;
cellnum = [];
id: number;
private sub: any;
client: String;

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder,public route: ActivatedRoute) {

 this.api.getCurrentCounselors().subscribe(data2 => { 
		
		console.log('data2 length is '+data2.length);
	
		for (var i=0;i<data2.length;i++) {
			 //console.log('couns is '+data2[i].counselor);
	    /*    if (this.couns)
			 this.couns = this.couns+','+data2[i].counselor;
		    else
			 this.couns = data2[i].counselor;
		 
		    if (this.cellnums)
			 this.cellnums = this.cellnums+','+data2[i].cellnum;
		    else
			 this.cellnums = data2[i].cellnum;
		*/
		this.coun.push(data2[i].counselor);
		this.cellnum.push(data2[i].cellnum);
		}
				
	//this.coun.push(this.couns.toString().split(','));
		
    //this.cellnum.push(this.cellnums.toString().split(','));
			
		console.log('coun length is '+this.coun.length);
		
		for (var j=0;j<this.coun.length;j++) 
		{
			console.log('loading '+j+' '+ this.coun[j]+' '+this.cellnum[j]);
			
			this.counselors.push([this.coun[j],this.cellnum[j]]);
		}
		
		});
  
  }

  ngOnInit() {
	  
	   console.log('pass in is '+this.route.snapshot.paramMap.get('id'));
	   
  }


}
