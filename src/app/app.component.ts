import { Component, ViewChild } from '@angular/core';
import { Platform, Events, NavController, Keyboard, ToastController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoadingPage } from '../pages/loading/loading';
import { HttpService } from '../providers/http.service';
import { LoginPage } from "../pages/login/login";
import { WelcomeSurvey } from "../pages/welcomeSurvey/welcomeSurvey";
import { ArchivePage } from "../pages/archive/archive";
import { FriendsPage } from "../pages/friends/friends";
import { GroupsPage } from "../pages/groups/groups";
import { AccountPage } from "../pages/account/account";
import { AddFriendPage } from "../pages/friends/add-friend/add-friend";
import { CarouselTestPage } from '../pages/carousel-test/carousel-test';

@Component({
  templateUrl: 'app.html',
  providers: [HttpService]
})
export class MyApp {
  // rootPage:any = HomePage;
  public rootPage: any = LoadingPage;
  @ViewChild('nav') nav: NavController;
  @ViewChild('menu') menu: MenuController;
  debug = true;
  debugPage = CarouselTestPage;

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
        this.showErrorPopover(message);
      });
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
        this.nav.setRoot(page == "home" ? this.debugPage : LoginPage, {}, {animate: true, direction: 'forward'})
      }
      else {
        this.menu.enable(page === "home");
        this.nav.setRoot(page == "home" ? HomePage : LoginPage, {}, {animate: true, direction: 'forward'});
      }
    })
  }

  openAccountPage() {
    this.nav.push(AccountPage);
    this.menu.close();
  }

  openFavoritesPage() {
    this.nav.push(ArchivePage);
    this.menu.close();
  }

  openFriendsPage() {
    this.nav.push(FriendsPage);
    this.menu.close();
  }

  openGroupsPage() {
    this.nav.push(GroupsPage);
    this.menu.close();
  }
}

