import { Component } from '@angular/core';
import { ActionSheet, ActionSheetController, IonicPage, NavController } from 'ionic-angular';
import { Item } from '../../model/item.model';
import { ShoppingListService } from '../../services/shoppinglist/shoppinglist.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { EditShoppingItemPage } from '../edit-shopping-item/edit-shopping-item';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  shoppingListRef$: FirebaseListObservable<Item[]>;

  constructor(public navCtrl: NavController, public shopping: AngularFireDatabase, private actionSheet: ActionSheetController) {
    this.shoppingListRef$ = this.shopping
      .list('shopping-list');
    this.shoppingListRef$.subscribe(x => console.log('here i ' + x.length));
  }

  selectItem(item: Item) {
    this.actionSheet.create({
      title: item.name,
      buttons: [
        {
          text: 'Edit',
          handler: () => {
            this.navCtrl.push(EditShoppingItemPage, { itemid: item.$key })
          }
        },
        {
          text: 'Delete',
          role: 'descructive',
          handler: () => {
            this.shoppingListRef$.remove(item.$key)
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('user selected cancel')
          }
        }
      ]
    }).present();
  }
}
