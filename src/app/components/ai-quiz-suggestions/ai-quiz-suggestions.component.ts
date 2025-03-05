import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ai-quiz-suggestions',
  standalone:false ,
  templateUrl: './ai-quiz-suggestions.component.html',
  styleUrls: ['./ai-quiz-suggestions.component.css']
})
export class AiQuizSuggestionsComponent {
  topic: string = '';
  numQuestions: number = 5;
  aiQuiz: any = null;
  rawAiText: string = ''; // ✅ Stores raw response
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  generateQuiz() {
    if (!this.topic.trim() || this.numQuestions < 1) {
      this.errorMessage = 'Please enter a valid topic and at least 1 question.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.aiQuiz = null;
    this.rawAiText = '';

    this.http.post<any>('http://localhost:8080/generate', { topic: this.topic, numQuestions: this.numQuestions })
      .subscribe({
        next: (response) => {
          console.log('AI Response:', response);

          if (response && response.quiz && Array.isArray(response.quiz.questions)) {
            this.aiQuiz = response.quiz; // ✅ Correct format
          } else {
            this.rawAiText = JSON.stringify(response, null, 2); // ✅ Store raw response
          }

          this.loading = false;
        },
        error: (error) => {
          this.errorMessage = 'Failed to generate quiz. Please try again.';
          console.error(error);
          this.loading = false;
        }
      });
  }

  addToQuiz(question: any) {
    console.log('Adding question:', question);
  }
}
