import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';
import { MatSnackBar } from '@angular/material/snack-bar';
import {QuizService} from '../quiz/quiz.service';

@Component({
  selector: 'app-take-quiz',
  templateUrl: './take-quiz.component.html',
  standalone:false,
  styleUrls: ['./take-quiz.component.css']
})
export class TakeQuizComponent implements OnInit {
  @ViewChild('stepper') stepper!: MatStepper;

  quizId!: number;
  quiz: any;
  selectedAnswers: { questionId: number, optionId?: number }[] = [];
  userId: number = 1; // Temporary, replace with actual logged-in user ID

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private router: Router,
    private snackBar: MatSnackBar // ✅ Inject Snackbar service
  ) {}

  ngOnInit(): void {
    this.quizId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadQuiz();
  }

  loadQuiz(): void {
    this.quizService.getQuizForUser(this.quizId).subscribe(
      (data) => {
        this.quiz = data;
        this.selectedAnswers = this.quiz.questions.map((q: { id: number }) => ({ questionId: q.id }));
        console.log('✅ Quiz loaded:', this.quiz);
      },
      (error) => {
        this.showAlert('❌ Error loading quiz', 'error');
        console.error('❌ Error loading quiz:', error);
      }
    );
  }

  selectAnswer(index: number, optionId: number): void {
    this.selectedAnswers[index].optionId = optionId;
    console.log('✅ Selected Answers:', this.selectedAnswers);
  }

  isAnswered(index: number): boolean {
    return this.selectedAnswers[index].optionId !== undefined;
  }

  submitQuiz(): void {
    if (this.selectedAnswers.some(ans => ans.optionId === undefined)) {
      this.showAlert('⚠️ Please answer all questions before submitting.', 'warning');
      return;
    }

    this.quizService.submitQuiz(this.quizId, this.userId, this.selectedAnswers).subscribe(
      (result) => {
        this.showAlert(`✅ Quiz submitted! Your score: ${result.score}/${this.quiz.questions.length}`, 'success');
        setTimeout(() => this.router.navigate(['/quizzes']), 2000); // Redirect after delay
      },
      (error) => {
        this.showAlert('❌ Error submitting quiz. Try again.', 'error');
        console.error('❌ Error submitting quiz:', error);
      }
    );
  }

  // ✅ Show Snackbar Alert
  showAlert(message: string, type: 'success' | 'error' | 'warning'): void {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      panelClass: `snackbar-${type}`,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
