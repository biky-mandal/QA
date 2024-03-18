import { Component, Input, OnInit } from '@angular/core';
import { Firestore, collection, collectionData, query, where } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.css']
})
export class QuestionCardComponent implements OnInit {
  @Input() question: any = {};
  questionWithAnswer: any = {};
  pressedAnswerKey: string | null = null;
  answer$!: Observable<any>;
  constructor(
    private firestore: Firestore
  ) { }

  ngOnInit(): void {
    this.setupQuestion();
  }

  setupQuestion = () => {
    this.questionWithAnswer = {};
    const { id, question, options } = this.question;
    this.questionWithAnswer = { id, question, options };
  }

  verifyAnswer = (qId: string, pressedKey: string) => {
    if(!this.pressedAnswerKey){

      this.pressedAnswerKey = pressedKey;

      const answerCollectionRef = collection(this.firestore, 'answers');
      const qry = query(answerCollectionRef, where('qid', '==', qId));
  
      this.getDataAcrToQuery(qry);
  
      this.answer$.subscribe((d: any) => {

      })
    }
  }

  getDataAcrToQuery = (query: any) => {
    this.answer$ = (collectionData(query)).pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a as any;
          const { key, description } = data;

          // Adding answers to the questions div
          this.questionWithAnswer['ans'] = { key, description }

          return data;
        });
      })
    );
  }
}
