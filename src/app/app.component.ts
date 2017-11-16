import { Component, OnInit } from '@angular/core';
// firestore
// import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'English Dictionary Intermediate 1';

  ngOnInit() {
    $(".button-collapse").sideNav();
  }
}
