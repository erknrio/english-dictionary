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
    var wordsCollection:any = this.afs.collection(
      this.collectionName,
      ref => ref.orderBy("english").startAt(term).endAt(term + '\uf8ff').limit(10)
    );
    // Retrieve category data + documentid
    // https://github.com/angular/angularfire2/blob/master/docs/firestore/collections.md
    return wordsCollection.snapshotChanges()
    .map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Word
        const documentId = a.payload.doc.id;

        return { documentId, data };
      });
    });
  }
}
