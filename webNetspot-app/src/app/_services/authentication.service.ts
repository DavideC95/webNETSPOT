//Is used to login and logout of the application.
//To login it posts the users credentials to the api and checks the response for a JWT token.
//If there is one it means authentication was successful so user details and the token
// are stored in a local storage.

//The logged-in user details are stored in local storage so the user will stay logged with a refresh of 
// the page and also between browser sessions until they loggout.


import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
	constructor(private http: Http){ }

	login(username: string, password: string){
		return this.http.post('api/authenticate', JSON.stringify({username: username, password: password}))
		.map((response: Response) =>{
			//login ok! if there is a jwt(?) token in the response
			let user = response.json();
			if(user&&user.token){
				//store data
				localStorage.setItem('currentUser', JSON.stringify(user));
			}
			return user;
		});
	}

	logout(){
		//remove local data
		localStorage.removeItem('currentUser');
	}
}