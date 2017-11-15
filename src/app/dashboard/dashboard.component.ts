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
      .subscribe(words => this.words = words.slice(0, 4));
  }
}
