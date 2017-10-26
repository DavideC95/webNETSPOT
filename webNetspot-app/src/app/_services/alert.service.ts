//Enable any component in the application to display alert messages at the top of the page via the alert component.
//There are two methods for displaying success and error messages.
//The getMessage() method returns an Observable that is used by the alert component to subscribe
// to notifications for whenever a message should be displayed


import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AlertService {
	private subject = new Subject<any>();
	private keepAfterNavigationChange = false;

	constructor(private router: Router){
		router.events.subscribe(event => {
			if(event instanceof NavigationStart){
				if(this.keepAfterNavigationChange){
					this.keepAfterNavigationChange = false;
				} else{
					this.subject.next();
				}
			}
		});
	}

	success(message: string, keepAfterNavigationChange = false){
		this.keepAfterNavigationChange = keepAfterNavigationChange;
		this.subject.next({ type: 'success', text: message });
	}

	error(message: string, keepAfterNavigationChange = false){
		this.keepAfterNavigationChange = keepAfterNavigationChange;
		this.subject.next({ type: 'error', text: message });
	}

	getMessage(): Observable<any> {
		return this.subject.asObservable();
	}
}