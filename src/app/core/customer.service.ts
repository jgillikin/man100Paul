import {Injectable} from '@angular/core';

const TOKEN = 'TOKEN';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  setToken(token: string): void {
    localStorage.setItem(TOKEN, token);
  }

  isLogged() {
	 
     if (localStorage.getItem(TOKEN) === null)
      return false;
     else 
      return true;		 
	  
	//original line below  
    //return localStorage.getItem(TOKEN) != null;
  }
}