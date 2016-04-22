import {Storage, SqlStorage} from 'ionic-angular';
import {Injectable} from 'angular2/core';

@Injectable()
export class Data {
  constructor() {
    this.storage = new Storage(SqlStorage, { name: 'checklist' });
    this.data = null;

    // this.storage.get('checklists').then((checklists) => {
    //   this.data = JSON.parse(checklists);
    // });
  }

  getData() {
    return this.storage.get('checklists');
  }

  save(data) {
    // let newData = JSON.stringify(data);
    // this.storage.set('checklists', newData);
    
    let saveData = [];

    //Remove observables
    data.forEach((checklist) => {
      saveData.push({
        title: checklist.title,
        items: checklist.items
      });
    });

    let newData = JSON.stringify(saveData);
    this.storage.set('checklists', newData);
  }
}

