import { Component, OnInit } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-firestore',
  templateUrl: './firestore.component.html',
  // styleUrls: ['./heroes.component.css']
})

export class FirestoreComponent implements OnInit {
  heroesCol: AngularFirestoreCollection<Hero>;
  heroes: Hero[];

  constructor(private afs: AngularFirestore) {

  }

  ngOnInit() {
    this.heroesCol = this.afs.collection('heroes');
    this.heroesCol.valueChanges().subscribe(heroes => this.heroes = heroes);
    console.log(this.heroes);
  }

}
