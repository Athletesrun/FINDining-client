// Framework Stuff
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

// Pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { GroupPage } from '../pages/group/group';
import { GroupsPage } from '../pages/groups/groups';
import { AccountPage } from '../pages/account/account';
import { ArchivePage } from '../pages/archive/archive';
import { RestaurantPage } from '../pages/restaurant/restaurant';
import { FilterPopover } from "../pages/home/filter/filter";
import { WelcomeSurvey } from "../pages/welcomeSurvey/welcomeSurvey";

// Components 
import { RestaurantComponent } from '../components/restaurant/restaurant';

// Popovers
import { OverflowPopover } from '../pages/home/overflow/overflow';

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
    FilterPopover
    OverflowPopover
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
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
    FilterPopover
    OverflowPopover
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule { }

