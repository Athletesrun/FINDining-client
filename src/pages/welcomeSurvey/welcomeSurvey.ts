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

  public categories: string[][] = [
    ["Steakhouses", "steak"],
    ["Salad", "salad"],
    ["Pizza", "pizza"],
    ["Sandwiches", "sandwiches"],
    // ["Fish"],
    ["Noodles", "noodles"],
    ["Diners", "diners"],
    ["Wraps", "wraps"],
    ["Mexican", "mexican"],
    ["French", "french"],
    ["Italian", "italian"],
    ["Polish", "polish"],
    ["Chinese", "chinese"],
    ["Middle Eastern", "mideastern"],
    ["Fish and Chips", "fishnchips"],
    ["Chicken Wings", "chicken_wings"],
    ["Gluten-free", "gluten_free"],
    ["Vegan", "vegan"],
    ["Vegetarian", "vegetarian"]
  ];
  private buttons = [];

  constructor(
    private nav: NavController,
    public events: Events,
    private http: HttpService
  ) {
    this.categories.map(d => {
      this.buttons.push({
        name: d[0],
        id: d[1],
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
      if (button.enabled) likedCategories.categories.push(button.id);
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
