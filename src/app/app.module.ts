// Framework Stuff
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from "@angular/common/http";
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

// Native
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';

// Pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { GroupPage, GroupRecommendationsPage } from '../pages/group/group';
import { GroupsPage } from '../pages/groups/groups';
import { AccountPage } from '../pages/account/account';
import { ArchivePage } from '../pages/archive/archive';
import { RestaurantPage } from '../pages/restaurant/restaurant';
import { FriendsPage } from "../pages/friends/friends";
import { FriendPage } from "../pages/friends/friend/friend";
import { LoadingPage } from '../pages/loading/loading';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { RatePage } from "../pages/rate/rate";
import { WelcomeSurvey } from "../pages/welcomeSurvey/welcomeSurvey";
import { AddFriendPage } from "../pages/friends/add-friend/add-friend";

// Components
import { RestaurantComponent } from '../components/restaurant/restaurant';
import { LoadingComponent } from "../components/loading/loading";
import { ErrorComponent } from '../components/error/error';
import { FriendListComponent } from "../components/friend-list/friend-list";

// Popovers
import { OverflowPopover } from '../pages/home/overflow/overflow';
import { FilterPopover } from "../pages/home/filter/filter";
import { CreateGroupPage } from "../pages/groups/create-group/create-group";
import { AddGroupMemberPage } from '../pages/group/add-group-member/add-group-member';

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
    LoginPage,
    RegisterPage,
    ErrorComponent,
    RatePage,
    AddFriendPage,
    CreateGroupPage,
    FriendListComponent,
    AddGroupMemberPage,
    GroupRecommendationsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {scrollAssist: false}),
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
    LoginPage,
    RegisterPage,
    ErrorComponent,
    RatePage,
    AddFriendPage,
    CreateGroupPage,
    FriendListComponent,
    AddGroupMemberPage,
    GroupRecommendationsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule { }

