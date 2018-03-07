import { Component } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { WelcomeSurvey } from "../pages/welcomeSurvey/welcomeSurvey";
import { LoadingPage } from '../pages/loading/loading';
import { HttpService } from '../providers/http.service';

@Component({
  templateUrl: 'app.html',
  providers: [HttpService]
})
export class MyApp {
  // rootPage:any = HomePage;
  public rootPage: any = LoadingPage;

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

      events.subscribe("finishedWelcomeSurvey", () => {
        this.rootPage = HomePage;
      });

      this.prepareHttp();
    });
  }

  prepareHttp = async () => {
    console.log("preparing HTTP.");
    this.rootPage = await this.http.CheckToken();
  }
}

