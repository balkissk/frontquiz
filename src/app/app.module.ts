import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddQuizComponent } from './quiz/add-quiz/add-quiz.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';  // Import ReactiveFormsModule

import { HttpClientModule } from '@angular/common/http';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';  // Corrected import
import { MatListModule } from '@angular/material/list';
import { QuizListComponent } from './quiz/quiz-list/quiz-list.component';
import { QuizDetailsComponent } from './quiz-details/quiz-details.component';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AiQuizSuggestionsComponent } from './components/ai-quiz-suggestions/ai-quiz-suggestions.component';

@NgModule({
    declarations: [
        AppComponent,
        AddQuizComponent,
        QuizListComponent,
        QuizDetailsComponent,
        AiQuizSuggestionsComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatExpansionModule,
    MatRadioModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
