// Framework Stuff
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';

// Pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { GroupPage } from '../pages/group/group';
import { GroupsPage } from '../pages/groups/groups';
import { AccountPage } from '../pages/account/account';
import { ArchivePage } from '../pages/archive/archive';
import { RestaurantPage } from '../pages/restaurant/restaurant';
import { FriendsPage } from "../pages/friends/friends";
import { FriendPage } from "../pages/friends/friend/friend";
import { LoadingPage } from '../pages/loading/loading';
import { LoginPage } from '../pages/login/login';
import { WelcomeSurvey } from "../pages/welcomeSurvey/welcomeSurvey";

// Components
import { RestaurantComponent } from '../components/restaurant/restaurant';
import { LoadingComponent } from "../components/loading/loading";

// Popovers
import { OverflowPopover } from '../pages/home/overflow/overflow';
import { FilterPopover } from "../pages/home/filter/filter";

// Services
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RestaurantPage,
    RestaurantComponent,
    AccountPage,
    GroupsPage,
    GroupPage,
    ArchivePage,
    FriendsPage,
    FriendPage,
    FilterPopover,
    OverflowPopover,
    WelcomeSurvey,
    LoadingPage,
    LoadingComponent,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RestaurantPage,
    RestaurantComponent,
    AccountPage,
    GroupsPage,
    GroupPage,
    ArchivePage,
    FriendsPage,
    FriendPage,
    FilterPopover,
    OverflowPopover,
    WelcomeSurvey,
    LoadingPage,
    LoadingComponent,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule { }

