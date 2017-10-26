import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, UserService } from '../_services/index';

@Component({
	moduleId: module.id,
	templateUrl: 'register.component.html'
})

export class RegisterComponent{
	model: any = {};
	loading = false;

	constructor(
		private router: Router,
		private userService: UserService,
		private alertService: AlertService
		){ }

	register(){
		this.loading = true;
		this.userService.create(this.model).subscribe(
			data=>{
				//Set success message and pass parameters to persist the message after redirecting to the login page
				this.alertService.success('Registration Successful', true);
				this.router.navigate(['/login']);
			},
			error=>{
				this.alertService.error(error);
				this.loading = false;
			});
	}
}