# ionic-tutorial2

## Créer une nouvelle application Ionic
```sh
ionic start ionic-tutorial2 sidemenu
# puis démarrer dans le navigateur :
ionic serve
```

## La géolocalisation
- ajouter une page pour tester la fonctionnalité de géolocalisation :
```sh
ionic generate page Exemple1
```

- ajouter les plugins suivants au projet :
```sh
# ajouter Ionic Native à l'application :
npm install @ionic-native/core --save
# ajouter le plugin de géolocalisation :
npm install @ionic-native/geolocation --save
```

- ajouter la page `Exemple1` au menu principal de l'application : (voir ionic-tutorial1).

- dans le fichier `src/app/app.module.ts` :
```ts
// ajouter l'import :
import { Geolocation } from "@ionic-native/geolocation";

// ajouter dans le tableau 'providers' : 
providers: [
    ... ,
    Geolocation
]
```

- dans le fichier `src/pages/exemple1.ts` :
```ts
// ajouter l'import :
import { Geolocation } from "@ionic-native/geolocation";
import { Platform } from "ionic-angular";

// le code de la classe : 
export class Exemple1Page {

  myCurrentLatitude: number;
  myCurrentLongitude: number;

  constructor(
    public navCtrl: NavController,
    private platform: Platform,
    private geolocation: Geolocation
  ) {

    console.log("AboutPage Constructor");

    platform.ready().then(() => {
      // get current position
      geolocation.getCurrentPosition().then(pos => {
        console.log("lat: " + pos.coords.latitude + ", lon: " + pos.coords.longitude );
        
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
}
```

- dans le fichier `src/pages/exemple1/exemple1.html` :
```html
<ion-content padding>
  ...
  <p>
    ma position actuelle : {{myCurrentLatitude}}, {{myCurrentLongitude}}
  </p>
  
</ion-content>
```