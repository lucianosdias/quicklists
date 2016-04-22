import {Page, NavController, Alert} from 'ionic-angular';
import {ChecklistPage} from '../checklist/checklist';
import {ChecklistModel} from '../../providers/checklist-model/checklist-model';
import {Data} from '../../providers/data/data';

@Page({
  templateUrl: 'build/pages/home/home.html',
  providers: [ChecklistModel]
})
export class HomePage {

  static get parameters() {
    return [[NavController], [Data]];
  }

  constructor(nav, dataService) {

    this.dataService = dataService;
    this.nav = nav;

    this.checklists = [];

    this.dataService.getData().then((checklists) => {

      let savedChecklists = false;

      if (typeof (checklists) != "undefined") {
        savedChecklists = JSON.parse(checklists);
      }

      if (savedChecklists) {

        savedChecklists.forEach((savedChecklist) => {

          let loadChecklist = new ChecklistModel(savedChecklist.title, savedChecklist.items);
          this.checklists.push(loadChecklist);

          loadChecklist.checklist.subscribe(update => {
            this.save();
          });

        });

      }

    });

  }

  addChecklist() {
    let prompt = Alert.create({
      title: 'New Checklist',
      body: 'Enter the name of your new checklist below:',
      inputs: [
        {
          name: 'name'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            let newChecklist = new ChecklistModel(data.name);
            this.checklists.push(newChecklist);

            newChecklist.checklist.subscribe(update => {
              this.save();
            });

            this.save();
          }
        }
      ]
    });

    this.nav.present(prompt);
  }

  renameChecklist(checklist) {

    let prompt = Alert.create({
      title: 'Rename Checklist',
      body: 'Enter the new name of this checklist below:',
      inputs: [
        {
          name: 'name'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {

            let index = this.checklists.indexOf(checklist);

            if (index > -1) {
              this.checklists[index].setTitle(data.name);
              this.save();
            }

          }
        }
      ]
    });

    this.nav.present(prompt);

  }

  viewChecklist(checklist) {
    this.nav.push(ChecklistPage, {
      checklist: checklist
    });
  }

  removeChecklist(checklist) {

    let index = this.checklists.indexOf(checklist);

    if (index > -1) {
      this.checklists.splice(index, 1);
      this.save();
    }

  }

  save() {
    this.dataService.save(this.checklists);
  }

}