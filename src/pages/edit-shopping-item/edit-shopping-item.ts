import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Item } from '../../model/item.model';

/**
 * Generated class for the EditShoppingItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-shopping-item',
  templateUrl: 'edit-shopping-item.html',
})
export class EditShoppingItemPage {

  shoppingItemRef$: FirebaseObjectObservable<Item>
  item: Item

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase) {

    const shoppingItemid = this.navParams.get('itemid')

    this.shoppingItemRef$ = database.object('shopping-list/' + shoppingItemid)

    this.shoppingItemRef$.subscribe(item => this.item = item)

  }

  updateItem(item: Item) {
    this.shoppingItemRef$.update(item).then(ref => {
      this.navCtrl.setRoot('HomePage')
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditShoppingItemPage');
  }

}
