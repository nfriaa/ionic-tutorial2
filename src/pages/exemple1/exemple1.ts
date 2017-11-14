import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import { Geolocation } from "@ionic-native/geolocation";
import { Platform } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-exemple1",
  templateUrl: "exemple1.html"
})
export class Exemple1Page {
  myCurrentLatitude: number;
  myCurrentLongitude: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private platform: Platform,
    private geolocation: Geolocation
  ) {
    console.log("Exemple1Page Constructor");

    platform.ready().then(() => {
      // get current position
      geolocation.getCurrentPosition().then(pos => {
        console.log(
          "lat: " + pos.coords.latitude + ", lon: " + pos.coords.longitude
        );

        this.myCurrentLatitude = pos.coords.latitude;
        this.myCurrentLongitude = pos.coords.longitude;
      });

      /*const watch = geolocation.watchPosition().subscribe(pos => {
        console.log("lat: " + pos.coords.latitude + ", lon: " + pos.coords.longitude);

        this.myCurrentLatitude = pos.coords.latitude;
        this.myCurrentLongitude = pos.coords.longitude;
      });*/

      // to stop watching
      //watch.unsubscribe();
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad Exemple1Page");
  }
}
