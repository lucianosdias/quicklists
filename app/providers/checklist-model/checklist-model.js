import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ChecklistModel {
  static get parameters() {
    return [[String], [Array]];
  }

  constructor(title, items) {
    this.title = title;
    this.items = items || [];

    this.checklistObserver = null;

    this.checklist = Observable.create(observer => {
      this.checklistObserver = observer;
    });
  }

  addItem(item) {
    this.items.push({
      title: item,
      checked: false
    });
    this.checklistObserver.next(true);
  }

  removeItem(item) {
    let index = this.items.indexOf(item);

    if (index > -1) {
      this.items.splice(index, 1);
      this.checklistObserver.next(true);
    }
  }

  renameItem(item, title) {
    let index = this.items.indexOf(item);

    if (index > -1) {
      this.items[index].title = title;
      this.checklistObserver.next(true);
    }
  }

  setTitle(title) {
    this.title = title;
    this.checklistObserver.next(true);
  }

  toggleItem(item) {
    item.checked = !item.checked;
    this.checklistObserver.next(true);
  }
}

