import { Component } from '@angular/core';
import { ViewController, Events } from 'ionic-angular';

@Component({
  templateUrl: "welcomeSurvey.html",
  providers: [],
  selector: "welcome-survey"
})

export class WelcomeSurvey {

  constructor(
    private view: ViewController,
    public events: Events
  ) {

  }

  dismissView() {
    this.events.publish("finishedWelcomeSurvey");
    setTimeout(() => {
      this.view.dismiss();
    }, 500);
  }

}
