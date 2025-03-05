import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddQuizComponent } from './quiz/add-quiz/add-quiz.component';
import { QuizListComponent } from './quiz/quiz-list/quiz-list.component';
import { QuizDetailsComponent } from './quiz-details/quiz-details.component';

const routes: Routes = [
  { path: 'add-quiz', component: AddQuizComponent },
  {path: 'quiz-list', component: QuizListComponent },
  { path: 'quiz-details/:id', component: QuizDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
