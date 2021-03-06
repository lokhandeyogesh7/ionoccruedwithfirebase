import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Item } from '../../model/item.model';
import { ShoppingListService } from '../../services/shoppinglist/shoppinglist.service';

/**
 * Generated class for the AddShoppingItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-shopping-item',
  templateUrl: 'add-shopping-item.html',
})
export class AddShoppingItemPage {

  item: Item = {
    name: '',
    price: undefined,
    quantity: undefined
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private shoppingList: ShoppingListService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddShoppingItemPage');
  }

  addItem(item: Item) {
    this.shoppingList.addItem(item).then(ref => {
      this.navCtrl.setRoot('HomePage', { key: ref.key })
    })
  }

}
