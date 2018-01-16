import { Component } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { WelcomeSurvey } from "../pages/welcomeSurvey/welcomeSurvey";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // rootPage:any = HomePage;
  public rootPage: any = WelcomeSurvey;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public events: Events) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      statusBar.overlaysWebView(false);
      statusBar.backgroundColorByHexString("#fafafa");
      splashScreen.hide();

      events.subscribe("finishedWelcomeSurvey", () => {
        this.rootPage = HomePage;
      });
    });


  }
}

