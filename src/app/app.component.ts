import { Component, ViewChild } from '@angular/core';
import { Platform, Events, NavController, Keyboard, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
// import { WelcomeSurvey } from "../pages/welcomeSurvey/welcomeSurvey";
import { LoadingPage } from '../pages/loading/loading';
import { HttpService } from '../providers/http.service';
import { LoginPage } from "../pages/login/login";
import { WelcomeSurvey } from "../pages/welcomeSurvey/welcomeSurvey";

@Component({
  templateUrl: 'app.html',
  providers: [HttpService]
})
export class MyApp {
  // rootPage:any = HomePage;
  public rootPage: any = LoadingPage;
  @ViewChild('nav') nav: NavController;
  debug = false;
  debugPage = WelcomeSurvey;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    keyboard: Keyboard,
    public events: Events,
    private http: HttpService,
    private toast: ToastController
  ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      // keyboard.disableScroll(true);
      statusBar.overlaysWebView(false);
      statusBar.backgroundColorByHexString("#fafafa");
      splashScreen.hide();
      events.subscribe("fd:error", message => {
        
      })
      this.prepareHttp();
    });
  }

  showErrorPopover(message) {
    this.toast.create({
      message
    }).present();
  }

  prepareHttp() {
    this.http.CheckToken().then(page => {
      if (this.debug) {
        this.nav.setRoot(this.debugPage, {}, {animate: true, direction: 'forward'})
      }
      else {
        this.nav.setRoot(page == "home" ? HomePage : LoginPage, {}, {animate: true, direction: 'forward'});
      }
    })
  }
}

