import { Component } from "@angular/core";
import { NavController, Platform } from "ionic-angular";

@Component({
  templateUrl: 'about.html',
  selector: 'page-about',
  providers: []
})

export class AboutPage {

  private websiteUrl:string = 'https://findining.org';
  private privacyUrl:string = 'https://findining.org/privacy/';
  private yelpUrl:string = 'https://www.yelp.com/';

  constructor(private nav: NavController, private plt: Platform) { }

  private openWebsite(event) {
    if(this.plt.is("ios")) {
      window.open(this.websiteUrl, '_system');
    } else {
      open(this.websiteUrl);
    }
  }

  private openPrivacyPolicy(event) {
    if(this.plt.is("ios")) {
      window.open(this.privacyUrl, '_system');
    } else {
      open(this.privacyUrl);
    }
  }

  private openYelpPage(event) {
    if(this.plt.is("ios")) {
      window.open(this.yelpUrl, '_system');
    } else {
      open(this.yelpUrl);
    }
  }

}
