import {Component, ViewChild} from '@angular/core';
import {Platform, Events, NavController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { WelcomeSurvey } from "../pages/welcomeSurvey/welcomeSurvey";
import { LoadingPage } from '../pages/loading/loading';
import { HttpService } from '../providers/http.service';
import {LoginPage} from "../pages/login/login";

@Component({
  templateUrl: 'app.html',
  providers: [HttpService]
})
export class MyApp {
  // rootPage:any = HomePage;
  public rootPage: any = LoadingPage;
  @ViewChild('nav') nav: NavController;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public events: Events,
    private http: HttpService
  ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      statusBar.overlaysWebView(false);
      statusBar.backgroundColorByHexString("#fafafa");
      splashScreen.hide();
      console.log(this.nav);

      events.subscribe("finishedWelcomeSurvey", () => {
        this.rootPage = HomePage;
      });

      this.prepareHttp();
    });
  }

  prepareHttp() {
    console.log("preparing HTTP.");
    this.http.CheckToken().then(page => {
      this.nav.setRoot(page == "home" ? HomePage : LoginPage, {}, {animate: true, direction: 'forward'});
    })
  }
}

