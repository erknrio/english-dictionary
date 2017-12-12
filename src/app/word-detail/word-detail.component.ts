import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Word }         from '../word';
import { WordService }  from '../word.service';
// Custom
import { firebaseConfig }       from '../custom-settings'

@Component({
  selector: 'app-word-detail',
  templateUrl: './word-detail.component.html',
})

export class WordDetailComponent implements OnInit {
  @Input() word: Word;
  private categories: any;
  model = new Word({});
  private document:string;
  private collectionName = 'words';

  constructor(
    private route: ActivatedRoute,
    private wordService: WordService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getWord();
    this.getCategories();
  }

  getWord(): void {
    const documentId = this.route.snapshot.params.documentId;
    this.document = documentId;
    this.wordService.getWord(documentId)
    .subscribe(
      word => {
        word.category = word.category.split("/").slice(-1)[0];
        this.word = word;
      }
    );
  }

  getCategories(): void {
    this.wordService.getCategories()
    .subscribe(categories => this.categories = categories);
  }

  goBack(): void {
    this.location.back();
  }

 save(ev): void {
   ev.stopImmediatePropagation();
   this.word.category = `firestore.googleapis.com/project/${firebaseConfig.projectId}/database/(default)/documents/` + this.word.category;
   console.log(this.word);
    this.wordService.updateWord(this.word, this.document)
  }
}
