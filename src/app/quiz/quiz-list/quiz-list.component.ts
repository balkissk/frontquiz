import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-quiz-list',
  standalone: false,
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent implements OnInit {
  quizzes: any[] = [];

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.loadQuizzes();
  }

  // Récupérer tous les quiz
  loadQuizzes(): void {
    this.quizService.getAllQuizzesWithoutQuestions().subscribe(
      (data) => {
        this.quizzes = data;
        console.log('Quizzes loaded:', this.quizzes);
      },
      (error) => {
        console.error('Error loading quizzes:', error);
      }
    );
  }
  
  deleteQuiz(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce quiz ?')) {
      this.quizService.deleteQuiz(id).subscribe(
        () => {
          console.log(`Quiz avec ID ${id} supprimé avec succès.`);
          this.quizzes = this.quizzes.filter((quiz) => quiz.id !== id); // Supprimer le quiz localement
        },
        (error) => {
          console.error('Erreur lors de la suppression du quiz:', error);
        }
      );
    }
  }
  
}
