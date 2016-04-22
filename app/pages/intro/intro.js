import {Page, NavController} from 'ionic-angular';
import {HomePage} from '../home/home';

@Page({
  templateUrl: 'build/pages/intro/intro.html',
})
export class IntroPage {
  static get parameters() {
    return [[NavController]];
  }

  constructor(nav) {
    this.nav = nav;
  }

  goToHome() {
    this.nav.setRoot(HomePage);
  }
}
