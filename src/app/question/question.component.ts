import { QuestionService } from './../service/question.service';
import { interval } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  public name: string = "";
  public questionList: any = [];
  public currentQuestion:number = 0;
  public hboPoints: number =0;
  public netflixPoints: number =0;
  public amzPoints: number = 0;
  public disneyPoints: number = 0;
  counter = 60;
  correctAnswer:number = 0;
  netflixAnswer:number = 0;
  incorrectAnswer:number =0;
  interval$:any;
  progress:string = "0";
  isQuizCompleted: boolean = false;
  constructor(private questionService : QuestionService) { }

  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
    this.getAllQuestions();
    this.startCounter();
  }
  getAllQuestions(){
    this.questionService.getQuestionJson()
    .subscribe(res=>{
      this.questionList = res.questions
    })
  }

  nextQuestion(){
    this.currentQuestion++;
  }
  previousQuestion(){
    this.currentQuestion--;
  }

  answer(currentQno:number,option:any){
    if(currentQno === this.questionList.length){
      this.isQuizCompleted = true;
      this.stopCounter();
    }
    if(option.hbo){
      this.hboPoints += 10;
      this.correctAnswer++;
      setTimeout(()=>{
        this.currentQuestion++;
        this.resetCounter();
        this.getProgressPercent();
      },250)
    }else if(option.netflix){
      this.netflixPoints += 10;
      this.correctAnswer++;
      setTimeout(()=>{
        this.currentQuestion++;
        this.resetCounter();
        this.getProgressPercent();
      },250
    );return
    }else if(option.amz){
      this.amzPoints += 10;
      this.correctAnswer++;
      setTimeout(()=>{
        this.currentQuestion++;
        this.resetCounter();
        this.getProgressPercent();
      },250
      );return
    }else if(option.disney){
      this.disneyPoints += 10;
      this.correctAnswer++;
      setTimeout(()=>{
        this.currentQuestion++;
        this.resetCounter();
        this.getProgressPercent();
      },250
      );return
    }
    //else{
    // this.points-=10;
    //   setTimeout(() => {
    //     this.currentQuestion++;
    //     this.incorrectAnswer++;
    //     this.resetCounter();
    //     this.getProgressPercent();
    //   },1000);
    // }
  }
  startCounter(){
    this.interval$ = interval(1000)
    .subscribe(val=>{
      this.counter--;
      if(this.counter === 0){
        this.currentQuestion ++;
        this.counter = 60;
        //this.points -= 10;
      }
    });
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 600000);
  }
  stopCounter(){
    this.interval$.unsubscribe();
    this.counter = 0;
  }
  resetCounter(){
    this.stopCounter();
    this.counter = 60;
    this.startCounter();
  }
  resetQuiz(){
    this.stopCounter();
    this.resetCounter();
    this.getAllQuestions();
    this.hboPoints = 0;
    this.netflixPoints = 0;
    this.amzPoints = 0;
    this.disneyPoints = 0;
    this.counter = 60;
    this.currentQuestion = 0;
    this.progress="0";
  }
  getProgressPercent(){
    this.progress = ((this.currentQuestion/this.questionList.length)*100).toString();
    return this.progress;
  }

}
