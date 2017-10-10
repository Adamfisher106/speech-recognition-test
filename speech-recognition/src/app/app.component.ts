import { Component, OnInit, OnDestroy } from '@angular/core';
import { SpeechRecognitionService } from './speech-recognition.service';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  
})
export class AppComponent implements OnInit, OnDestroy {
 showSearchButton: boolean;
 speechData: string;

 constructor(private speechRecognitionService: SpeechRecognitionService) {
  this.showSearchButton = true;
  this.speechData = ""; 
 }

 ngOnInit() {
   console.log("Hi")
 }

 ngOnDestroy() {
   this.speechRecognitionService.DestroySpeechObject();
 }
 activateSpeechSearchMovie(): void {
   this.showSearchButton = false;

   this.speechRecognitionService.record()
       .subscribe(
         //this is what listens
         (value) => {
           this.speechData = value;
           console.log(value);
         },
         //this is the error bit
         (err) => {
           console.log(err);
           if (err.error == "no-speech") {
             console.log("--restarting service--");
             this.activateSpeechSearchMovie();
           }
         },
         //this is the completed bit
         () => {
           this.showSearchButton = true;
           console.log("--complete");
           this.activateSpeechSearchMovie();
         });
  }

}
