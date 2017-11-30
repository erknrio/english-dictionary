import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Word } from './word';
import { Category } from './category';
import { MessageService } from './message.service';

@Injectable()
export class WordService {
  private collectionWordName = 'words';
  private collectionCategoriesName = 'categories';
  private wordsUrl = 'api/words';  // URL to web api

  constructor(
    private afs: AngularFirestore,
    private messageService: MessageService) { }

  /** GET words from firestore */
  getWords (): Observable<Word[]> {
    var wordsCollection:any = this.afs.collection(this.collectionWordName, ref => ref.orderBy("english"));
    // Retrieve word data + documentid
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

  /** GET categories from firestore */
  getCategories (): Observable<Category[]> {
    var categoriesCollection:any = this.afs.collection(this.collectionCategoriesName, ref => ref.orderBy("name"));
    // Retrieve category data + documentid
    // https://github.com/angular/angularfire2/blob/master/docs/firestore/collections.md
    return categoriesCollection.snapshotChanges()
    .map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Category
        const documentId = a.payload.doc.id;

        return { documentId, data };
      });
    });
  }

  /** GET word by id. Will 404 if id not found */
  getWord(documentId: string): Observable<Word> {
    var wordsCollection:any = this.afs.doc(this.collectionWordName + '/' + documentId);
    return wordsCollection.valueChanges();
  }

  /* GET words whose name contains search term */
  searchWords(term: string): Observable<Word[]> {
    var wordsCollection: any;
    // FIXME Implementar busqueda
    if (!term.trim()) {
      // if not search term, return empty word array.
      return of([]);
    }

    wordsCollection = this.afs.collection(this.collectionCategoriesName, ref => ref.where("english", ">=", term));
    return wordsCollection.valueChanges();
    // return this.http.get<Word[]>(`api/words/?name=${term}`).pipe(
    //   tap(_ => this.log(`found words matching "${term}"`)),
    //   catchError(this.handleError<Word[]>('searchWords', []))
    // );
  }

  //////// Save methods //////////

  /** POST: add a new word to the server */
  addWord (word: Word): Observable<Word> {
    var result:any = this.afs.collection(this.collectionWordName).add(word);
    return result;
    // .then(function(docRef) {
    //   console.log("Document written with ID: ", docRef.id);
    //   return docRef;
    // })
    // .catch(function(error) {
    //   console.error("Error adding document: ", error);
    //   return null;
    // });
  }

  /** DELETE: delete the word from the server */
  deleteWord (word: Word): Observable<Word> {
    var result: any = this.afs.collection(this.collectionWordName).doc(word.documentId).delete();
    return result;
    // .then(function() {
    //   console.log("Word with ID: " + word.documentId + " deleted successful");
    // })
    // .catch(function(error) {
    //   console.error("Error adding document: ", error);
    // });
    // return null;
  }

  /** PUT: update the word on the server */
  updateWord (word: Word, documentId): Observable<any> {
    this.afs.collection(this.collectionWordName).doc(documentId).update(word)
    .then(function() {
      console.log("Word updated successful");
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
    return null;
  }
}
