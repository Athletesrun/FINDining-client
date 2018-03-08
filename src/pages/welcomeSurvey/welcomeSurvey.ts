import { Component } from '@angular/core';
import {Events, NavController} from 'ionic-angular';
import {HomePage} from "../home/home";

@Component({
  templateUrl: "welcomeSurvey.html",
  providers: [],
  selector: "welcome-survey"
})

export class WelcomeSurvey {

  public categories: string[] = ["Steakhouse", "Salad", "Pizza", "Sandwiches", "Mexican", "Asian", "Italian", "Fish", "Noodles", "Diners", "Deli", "Wraps", "Polish", "Middle Eastern", "Gluten-free", "Fish and Chips", "Chicken Wings"];

  constructor(
    private nav: NavController,
    public events: Events
  ) {

  }

  dismissView() {
    this.nav.setRoot(HomePage, {}, { animate: true, direction: "forward" });
  }

  public clickRestaurant(event) {
    //This code is so fucking bad. It needs to be fixed
    event.preventDefault();
    if(event.target.parentElement.nodeName == "DIV") {
      if(event.target.hasAttribute("style")) {
        event.target.removeAttribute("style");
      } else {
        event.target.setAttribute("style", "background-color: black; color: white;");
      }
    } else {
      if(event.target.parentElement.hasAttribute("style")) {
        event.target.parentElement.removeAttribute("style");
      } else {
        event.target.parentElement.setAttribute("style", "background-color: black; color: white;");
      }
    }
  }

}
