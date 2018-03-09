import { Component } from '@angular/core';
import {Events, NavController} from 'ionic-angular';
import {HomePage} from "../home/home";
import {HttpService} from "../../providers/http.service";
import {GenericStatusRes} from "../../models/responses.model";
import {LoadingPage} from "../loading/loading";

@Component({
  templateUrl: "welcomeSurvey.html",
  providers: [HttpService],
  selector: "welcome-survey"
})

export class WelcomeSurvey {

  public categories: string[] = ["Steakhouse", "Salad", "Pizza", "Sandwiches", "Mexican", "Asian", "Italian", "Fish", "Noodles", "Diners", "Deli", "Wraps", "Polish", "Middle Eastern", "Gluten-free", "Fish and Chips", "Chicken Wings", "Vegan", "Vegetarian"];
  private buttons = [];

  constructor(
    private nav: NavController,
    public events: Events,
    private http: HttpService
  ) {
    this.categories.map(d => {
      this.buttons.push({
        name: d,
        enabled: false
      })
    })
  }

  dismissView() {
    this.nav.push(LoadingPage);
    let likedCategories = {
      categories: []
    };
    for (let button of this.buttons) {
      if (button.enabled) likedCategories.categories.push(button.name);
    }
    this.http.PostSurveyResults(likedCategories).subscribe((res: GenericStatusRes) => {
      if (res.status === 10) {
        this.nav.setRoot(HomePage, {}, { animate: true, direction: "forward" });
      }
      else {
        this.nav.pop();
      }
    });
  }

  clickButton(index) {
    this.buttons[index].enabled = !this.buttons[index].enabled;
  }

}
