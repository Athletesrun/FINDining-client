// Framework Stuff
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from "@angular/common/http";
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

//hammer.js
import 'hammerjs';
import 'hammer-timejs';

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
import { AboutPage } from '../pages/account/about/about';
import { ArchivePage } from '../pages/archive/archive';
import { RestaurantPage } from '../pages/restaurant/restaurant';
import { FriendsPage } from "../pages/friends/friends";
import { FriendPage } from "../pages/friends/friend/friend";
import { LoadingPage } from '../pages/loading/loading';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { RatePage } from "../pages/rate/rate";
import { WelcomeSurvey } from "../pages/welcomeSurvey/welcomeSurvey";
import { CarouselTestPage } from '../pages/carousel-test/carousel-test';
import { CreateGroupPage } from "../pages/groups/create-group/create-group";
import { AddFriendPage } from "../pages/friends/add-friend/add-friend";
import { GroupFavoritesPage } from '../pages/group/group-favorites/favorites';
import { GroupMembersPage } from '../pages/group/group-members/group-members';
import { AddGroupMemberPage } from '../pages/group/add-group-member/add-group-member';

// Components
import { RestaurantComponent } from '../components/restaurant/restaurant';
import { LoadingComponent } from "../components/loading/loading";
import { ErrorComponent } from '../components/error/error';
import { FriendListComponent } from "../components/friend-list/friend-list";

// Popovers
import { OverflowPopover } from '../pages/home/overflow/overflow';
import { FilterPopover } from "../pages/home/filter/filter";
import { ReasonPopover } from '../pages/restaurant/restaurant';

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
    GroupRecommendationsPage,
    ReasonPopover,
    GroupMembersPage,
    AboutPage,
    CarouselTestPage,
    GroupFavoritesPage
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
    GroupRecommendationsPage,
    ReasonPopover,
    GroupMembersPage,
    CarouselTestPage,
    AboutPage,
    GroupFavoritesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule { }

