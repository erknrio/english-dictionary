export class Word {
  public id: number
  public english: string;
  public spanish: string;
  public spanishPronunciation: string;
  public phonetic: string;
  public category: any
  public data?: {
    id: number,
    english: string,
    spanish: string
  };
  documentId?: string

  constructor({
    id = 0,
    english = '',
    spanish = '',
    spanishPronunciation = '',
    phonetic = '',
    category = ''
  }) {
    this.id = id;
    this.english = english;
    this.spanish = spanish;
    this.spanishPronunciation = spanishPronunciation;
    this.phonetic = phonetic;
    this.category = category;
  }
}
