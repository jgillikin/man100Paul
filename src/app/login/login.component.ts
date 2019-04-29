import {Component} from '@angular/core';
import { ApiService } from '../core/api.service';
import {CustomerService} from '../core/customer.service';
import {Router} from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email = 'peter@klaven';
  password = 'cityslicka';

  constructor(private api: ApiService, public auth: AuthService, public customer: CustomerService, private router: Router) {
  }

  tryLogin() {
	  
	  console.log('call api login');
	  
	this.api.login(this.email,this.password).subscribe(
    response => {
      // Do stuff whith your result
	          if (response.success) {
   			   this.auth.loggedIn=true;
			   console.log('got token '+response.success);
			   localStorage.setItem('TOKEN', 'good'); 
			  }
			  else {
				this.auth.loggedIn=false;
                console.log(response.success);
                				
			  }

    },
    err => {
      // Do stuff whith your error
	  console.log("Incorrect Credentials");

    },
    () => {
      // Do stuff after completion
	 if (this.auth.loggedIn)
      this.router.navigateByUrl('/event-create');
     else 
	   alert("Invalid Credentials");
    },
)
	
/*	
    this.api.login(
      this.email,
      this.password
    )
	 //.pipe(finalize(() => this.router.navigateByUrl('/event-create')   ))
	 .subscribe(
        r => {
          if (r.token) {
			  this.auth.loggedIn=true;
			  console.log('got token '+r.token);
			  localStorage.setItem('TOKEN', 'good');
			  
			  this.router.navigateByUrl('/event-create');
			     
          }
        },
        r => {
          //console.log(r.error.error);
		  alert("Incorrect Credentials");
        }
	*/
	
} //end tryLogin

}