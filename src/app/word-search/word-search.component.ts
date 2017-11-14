import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { of }         from 'rxjs/observable/of';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Word } from '../word';
import { WordService } from '../word.service';

@Component({
  selector: 'app-word-search',
  templateUrl: './word-search.component.html',
  styleUrls: [ './word-search.component.css' ]
})
export class WordSearchComponent implements OnInit {
  words$: Observable<Word[]>;
  private searchTerms = new Subject<string>();

  constructor(private wordService: WordService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.words$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.wordService.searchWords(term)),
    );
  }
}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
