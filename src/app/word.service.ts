import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Word } from './word';
import { Category } from './category';

@Injectable()
export class WordService {
  private collectionWordName = 'words';
  private collectionCategoriesName = 'categories';
  private wordsUrl = 'api/words';  // URL to web api

  constructor(
    private afs: AngularFirestore) { }

  /**
   * Get words from Firestore
   * @method getWords
   * @return {Observable<Word[]>} [description]
   */
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

  /**
   * Get categories from Firestore
   * @method getCategories
   * @return {Observable<Category[]>} [description]
   */
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

  /**
   * Get word by id
   * @method getWord
   * @param  {string}           documentId Word unique id
   * @return {Observable<Word>}            [description]
   */
  getWord(documentId: string): Observable<Word> {
    var wordsCollection:any = this.afs.doc(this.collectionWordName + '/' + documentId);
    return wordsCollection.valueChanges();
  }

  /**
   * Get words whose name contains search term
   * @method searchWords
   * @param  {string}             term Partial word for searh
   * @return {Observable<Word[]>}      [description]
   */
  searchWords(term: string): Observable<Word[]> {
    var wordsCollection: any;
    if (!term.trim()) {
      // if not search term, return empty word array.
      return of([]);
    }

    wordsCollection = this.afs.collection(this.collectionCategoriesName, ref => ref.where("english", ">=", term));
    return wordsCollection.valueChanges();
  }

  /**
   * Add a new word to Firestore
   * @method addWord
   * @param  {Word}             word Word to add
   * @return {Observable<Word>}
   */
  addWord (word: Word): Observable<Word> {
    var result:any = this.afs.collection(this.collectionWordName).add(word);
    return result;
  }

  /**
   * Delete the word from the server
   * @method deleteWord
   * @param  {Word}             word Word to delete
   * @return {Observable<Word>}
   */
  deleteWord (word: Word): Observable<Word> {
    var result: any = this.afs.collection(this.collectionWordName).doc(word.documentId).delete();
    return result;
  }

  /**
   * Update the word on the server
   * @method updateWord
   * @param  {Word}            word       Word to update
   * @param  {[type]}          documentId Word unique id
   * @return {Observable<any>}
   */
  updateWord (word: Word, documentId): Observable<any> {
    this.afs.collection(this.collectionWordName).doc(documentId).update(word)
    .then(function() {
      alert("Word updated successful");
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
    return null;
  }
}
