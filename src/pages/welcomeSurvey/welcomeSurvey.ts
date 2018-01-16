import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  templateUrl: "welcomeSurvey.html",
  providers: [],
  selector: "welcome-survey"
})
export class WelcomeSurvey {

  constructor(
    private view: ViewController
  ) {

  }

}
