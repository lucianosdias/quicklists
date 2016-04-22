import {Page, NavController, NavParams, Alert} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/checklist/checklist.html',
})
export class ChecklistPage {
  static get parameters() {
    return [[NavController], [NavParams]];
  }

  constructor(nav, navParams) {
    this.nav = nav;
    this.navParams = navParams;
    this.checklist = this.navParams.get('checklist');
  }

  addItems() {
    let prompt = Alert.create({
      title: 'Add Item',
      body: 'Checklist name:',
      inputs: [{
        name: 'name'
      }],
      buttons: [{
        text: 'Cancel'
      },
        {
          text: 'Save',
          handler: data => {
            this.checklist.addItem(data.name);
          }
        }]
    });

    this.nav.present(prompt);
  }

  toggleItem(item) {
    this.checklist.toggleItem(item);
  }

  removeItem(item) {
    this.checklist.removeItem(item);
  }

  renameItem(item) {
    let prompt = Alert.create({
      title: 'Rename Item',
      body: 'Checklist name:',
      inputs: [{
        name: 'name'
      }],
      buttons: [{
        text: 'Cancel'
      },
        {
          text: 'Save',
          handler: data => {
            this.checklist.renameItem(item, data.name);
          }
        }]
    });

    this.nav.present(prompt);
  }

  uncheckItems() {
    this.checklist.items.forEach((item) => {
      if (item.checked) {
        this.checklist.toggleItem(item);
      }
    });
  }
}
