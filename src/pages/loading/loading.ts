import { Component } from '@angular/core';

@Component({
  templateUrl: 'loading.html',
  selector: 'page-loading'
})
export class LoadingPage {
  static page: LoadingPage;

  ngOnInit() {
    LoadingPage.page = this;
  }
}
