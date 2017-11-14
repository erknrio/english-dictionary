import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Word }       from './word';

@Injectable()
export class WordSearchService {
  private collectionName = 'words';


  constructor(private afs: AngularFirestore) {}

  search(term: string): Observable<Word[]> {
    var wordsCollection:any = this.afs.collection(this.collectionName).doc( + '/' + term);
    return wordsCollection.valueChanges();

    // return this.http
    //            .get(`api/words/?name=${term}`)
    //            .map(response => response.json().data as Word[]);
  }
}
