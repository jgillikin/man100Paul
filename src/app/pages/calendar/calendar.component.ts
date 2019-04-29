import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApiService } from './../../core/api.service';
import { UtilsService } from './../../core/utils.service';
import { FilterSortService } from './../../core/filter-sort.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms'
import { EventModel } from './../../core/models/event.model';
//import {EventService} from '../../services/event.service';
//import {Event} from '../models/event';
import "dhtmlx-scheduler";
import { ModalService } from '../../modal/modal.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';


import {} from '@types/dhtmlxscheduler';

declare var jQuery:any;

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'scheduler',
    styleUrls: ['calendar.component.scss'],
    templateUrl: 'calendar.component.html'
	
  //  providers: [ EventService ]
})

export class CalendarComponent implements OnInit {
  pageTitle = 'Events';
  eventListSub: Subscription;
  eventList: EventModel[];
  filteredEvents: EventModel[];
  loading: boolean;
  error: boolean;
  query: '';
  closeResult: string;
  bookForm: FormGroup;
  errorMessage: String;
  ev2;
  //jsonData;
  categories = [];
  categories2 = [];
  categories3 = [];
  selectedCategory: string;
  private modalRef: NgbModalRef
	
    @ViewChild('scheduler_here') schedulerContainer: ElementRef;

    constructor(private title: Title,
    public utils: UtilsService,
    private api: ApiService,
    public fs: FilterSortService,private modalService: NgbModal, private router: Router,
	private formBuilder: FormBuilder) {}

    ngOnInit() {
		this.bookForm = this.formBuilder.group({
    'counselor' : [null, Validators.required],
	'selectedCategory' : [null, Validators.required],
    'start_date' : [null, Validators.required],
    'end_date' : [null, Validators.required],
	'cellnum' : '',
	'counselorid': '',
    'id' : 'abc23',
	'mode': 'Save',
	'viewPublic': true
  });
		
		
        scheduler.config.xml_date = '%Y-%m-%d %H:%i';

        
        scheduler.init(this.schedulerContainer.nativeElement, new Date());
		
		/*
		
        scheduler.attachEvent('onEventAdded', (id, ev) => {
            this.eventService.insert(this.serializeEvent(ev, true))
                .then((response) => {
                    if (response.id !== id) {
                        scheduler.changeEventId(id, response.id);
                    }
                });
        }); */
		

        scheduler.attachEvent('onEventChanged', (id, ev) => {
			
			//console.log('id is '+id);
			this.ev2 = JSON.stringify(ev);
			console.log('ev2 is '+this.ev2);
			
  //          this.eventService.update(this.serializeEvent(ev));
			
			this.api.editUser(this.ev2)  
  .subscribe(data =>  {  console.log(data.data);  
       
         //jQuery('#let-modal').modal('hide');
  }   
  , error => this.errorMessage = error );
  
        });


        scheduler.attachEvent('onEventDeleted', (id, ev) => {
			
			//console.log('id is '+id);
			this.ev2 = JSON.stringify(ev);
			console.log('ev2 is '+this.ev2);
			
			this.api.deleteUser(this.ev2)  
  .subscribe(data =>  {  console.log(data.data);  
       
         //jQuery('#let-modal').modal('hide');
  }   
  , error => this.errorMessage = error );
			
            //this.eventService.remove(id);
        });
	
/*
        this.api.get2()
            .then((data) => {
				scheduler.parse(data, 'json');
            }); */
	
	    this.api.getEvents4().subscribe(data => { 
		
		 console.log(data); 
		 scheduler.parse(data, 'json'); 
		 
		 });
	
	    this.api.getCurrentCounselors().subscribe(data2 => { 
		
		  //console.log(data2[0].counselor); 
		  
		for (var i=0;i<data2.length;i++) {
		  this.categories[i] = data2[i].counselor;
		  this.categories2[i] = data2[i].cellnum;
		  this.categories3[i] = data2[i]._id;
		}
		
		});
     
			
    }
	
	openVerticallyCentered(content) {
     this.modalRef = this.modalService.open(content);
    this.modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      console.log('dismissed');
	  //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
	
	 private _getEventList() {
    this.loading = true;
    // Get future, public events
    this.eventListSub = this.api
      .getEvents$()
      .subscribe(
        res => {
          this.eventList = res;
          this.filteredEvents = res;
          this.loading = false;
        },
        err => {
          console.error(err);
          this.loading = false;
          this.error = true;
        }
      );
  }
  
   open(content,form2: NgForm) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = 'Closed with: ${result}';
	//  this.onFormSubmit(form2);
    }, (reason) => {
		console.log('closed');
      this.closeResult = 'Dismissed ${this.getDismissReason(reason)}';
    });
  }
  
  onFormSubmit(form: any,content) {
	//console.log('call postEventMan ');
	
	var idsel = document.forms[0].elements["test"].selectedIndex 
  //  console.log('index selected is 'idsel);
	

	
	form.cellnum = this.categories2[idsel-1];
	form.counselorid = this.categories3[idsel-1];
	
	//console.log('passing form cellnum to saveUser of '+form.cellnum);
	
	//form.viewPublic=true;
/*	this.api.saveUser(form)  
  .subscribe(data =>  {  console.log(data.data);  
 
         //jQuery('#let-modal').modal('hide');
  }   
  , error => this.errorMessage = error )
  , () => this.api.getEvents4().subscribe(data => { scheduler.parse(data, 'json'); });
*/

      this.api.saveUser(form).subscribe(
        response => { 
		 console.log('in response');    
		 this.api.getEvents4().subscribe(data => { 
		  scheduler.parse(data, 'json'); }); 
		}
		//,err => console.log('error');		
      ); 
	  
	  	  this.modalRef.close();
	 
	  }
	   
	  
    private serializeEvent(data: any, insert: boolean = false): Event {
        const result = {};

        for (let i in data) {
            if (i.charAt(0) === '$' || i.charAt(0) === '_') {
                continue;
            }
            if (insert && i === 'id') {
                continue;
            }
            if (data[i] instanceof Date) {
                result[i] = scheduler.templates.xml_format(data[i]);
            } else {
                result[i] = data[i];
            }
        }
        return result as Event;
    }

}