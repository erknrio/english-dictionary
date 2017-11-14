import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Word } from '../word';
import { WordService } from '../word.service';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.css']
})

export class WordsComponent implements OnInit {
  words: Word[];
  model = new Word({});
  submitted = false;
  private id: number;
  private word: string;

  constructor(private wordService: WordService) { }
  ngOnInit() {
    this.getWords();
  }

  getWords(): void {
    this.wordService.getWords()
    .subscribe(words => this.words = words);
  }

  add(submitedForm: NgForm): void {
    var name = submitedForm.form.value.name.trim(),
    wordId = 0;
    this.submitted = true;

    if (!name) { return; }

    if (this.words[this.words.length -1].hasOwnProperty("data")) {
      wordId = this.words[this.words.length -1].data.id;
    } else {
      wordId = this.words[this.words.length -1].id;
    }

    this.wordService.addWord({ name } as Word, wordId)
      .subscribe(word => {
        this.words.push(word);
      });
    submitedForm.reset();
  }

  delete(word: Word): void {
    this.words = this.words.filter(h => h !== word);
    this.wordService.deleteWord(word).subscribe();
  }
}

/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
