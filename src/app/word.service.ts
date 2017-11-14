import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Word } from './word';
import { MessageService } from './message.service';

@Injectable()
export class WordService {
  private collectionName = 'words';
  private wordsUrl = 'api/words';  // URL to web api

  constructor(
    private afs: AngularFirestore,
    private messageService: MessageService) { }

  /** GET words from firestore */
  getWords (): Observable<Word[]> {
    var wordsCollection:any = this.afs.collection(this.collectionName, ref => ref.orderBy("id"));
    // Retrieve word data + documentid
    return wordsCollection.snapshotChanges()
    .map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Word
        const documentId = a.payload.doc.id;

        return { documentId, data };
      });
    });
  }

  /** GET word by id. Will 404 if id not found */
  getWord(documentId: string): Observable<Word> {
    var wordsCollection:any = this.afs.doc(this.collectionName + '/' + documentId);
    return wordsCollection.valueChanges();
  }

  /* GET words whose name contains search term */
  searchWords(term: string): Observable<Word[]> {
    // FIXME Implementar busqueda
    if (!term.trim()) {
      // if not search term, return empty word array.
      return of([]);
    }
    // return this.http.get<Word[]>(`api/words/?name=${term}`).pipe(
    //   tap(_ => this.log(`found words matching "${term}"`)),
    //   catchError(this.handleError<Word[]>('searchWords', []))
    // );
  }

  //////// Save methods //////////

  /** POST: add a new word to the server */
  addWord (word: Word, lastId: number): Observable<Word> {
    var data: Word = {
      'id': lastId + 1,
      'english': word.english,
      "spanish": word.spanish,
      "spanishPronunciation": word.spanishPronunciation,
      "phonetic": word.phonetic,
      "category": word.category,
    };

    this.afs.collection(this.collectionName).add(data)
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
    return null;
  }

  /** DELETE: delete the word from the server */
  deleteWord (word: Word): Observable<Word> {
    this.afs.collection(this.collectionName).doc(word.documentId).delete()
    .then(function() {
      console.log("Word with ID: " + word.documentId + " deleted successful");
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
    return null;
  }

  /** PUT: update the word on the server */
  updateWord (word: Word, documentId): Observable<any> {
    this.afs.collection(this.collectionName).doc(documentId).update(word)
    .then(function() {
      console.log("Word updated successful");
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
    return null;
  }
}
