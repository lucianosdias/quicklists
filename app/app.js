import {App, Platform, Storage, LocalStorage} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HomePage} from './pages/home/home';
import {IntroPage} from './pages/intro/intro';
import {Data} from './providers/data/data';


@App({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [Data],
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
export class MyApp {
  static get parameters() {
    return [[Platform]];
  }

  constructor(platform) {

    this.rootPage = HomePage;

    this.local = new Storage(LocalStorage);

    this.local.get('introShown').then((result) => {
      if (result) {
        this.rootPage = HomePage;
      } else {
        this.local.set('introShown', true);
        this.rootPage = IntroPage;
      }
    });
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}
