import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';

import { AuthService } from './auth.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'English Dictionary Intermediate 1';
  email: string;
  password: string;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    (<any>$(".button-collapse")).sideNav();
  }

  login() {
    this.authService.login(this.email, this.password);
    this.email = this.password = '';
  }

  logout() {
    this.authService.logout();
  }
}
