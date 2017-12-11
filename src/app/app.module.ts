// Angular modules
import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';

import { AppRoutingModule }     from './app-routing.module';
// Firestore modules
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
// App components and services
import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { WordDetailComponent }  from './word-detail/word-detail.component';
import { WordsComponent }       from './words/words.component';
import { WordSearchComponent }  from './word-search/word-search.component';
import { WordService }          from './word.service';
import { WordSearchService }    from './word-search.service';
import { AuthService }          from './auth.service';
import { MessageService }       from './message.service';
import { MessagesComponent }    from './messages/messages.component';
// Custom
import { firebaseConfig }       from './custom-settings'
import * as $ from 'jquery';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    WordsComponent,
    WordDetailComponent,
    MessagesComponent,
    WordSearchComponent,
  ],
  providers: [ WordService, WordSearchService, AuthService, MessageService ],
  bootstrap: [ AppComponent ]
})

export class AppModule {}
