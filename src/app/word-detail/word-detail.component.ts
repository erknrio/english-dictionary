import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Word }         from '../word';
import { WordService }  from '../word.service';

@Component({
  selector: 'app-word-detail',
  templateUrl: './word-detail.component.html',
  styleUrls: [ './word-detail.component.css' ]
})
export class WordDetailComponent implements OnInit {
  @Input() word: Word;
  private document:string;
  private collectionName = 'words';

  constructor(
    private route: ActivatedRoute,
    private wordService: WordService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getWord();
  }

  getWord(): void {
    const documentId = this.route.snapshot.params.documentId;
    this.document = documentId;
    this.wordService.getWord(documentId)
      .subscribe(word => this.word = word);
  }

  goBack(): void {
    this.location.back();
  }

 save(): void {
    this.wordService.updateWord(this.word, this.document)
    .subscribe(() => this.goBack());
  }
}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
