import { Component, OnInit } from '@angular/core';
import { Word } from '../word';
import { WordService } from '../word.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  words: Word[] = [];

  constructor(private wordService: WordService) { }

  ngOnInit() {
    this.getWords();
  }

  getWords(): void {
    this.wordService.getWords()
      .subscribe(words => this.words = words.slice(1, 5));
  }
}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
