# ionic-tutorial2

[![contributions welcome](https://img.shields.io/badge/contributions-welcome-orange.svg?style=flat)](https://github.com/nfriaa/ionic-tutorial2/issues) [![Travis](https://img.shields.io/travis/rust-lang/rust.svg)](https://github.com/nfriaa/ionic-tutorial2) [![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/nfriaa/ionic-tutorial2/blob/master/LICENSE)

![](https://img.shields.io/badge/node-8-red.svg)
![](https://img.shields.io/badge/npm-5-blue.svg)
![](https://img.shields.io/badge/ionic-3-ff69b4.svg)
![](https://img.shields.io/badge/angular-5-orange.svg)
![](https://img.shields.io/badge/typescript-latest-green.svg)
![](https://img.shields.io/badge/editor-vscode-yellow.svg)

## Pour tester cette application en local
```sh
git clone https://github.com/nfriaa/ionic-tutorial2.git
cd ionic-tutorial2
npm install
ionic serve
```

## Créer une nouvelle application Ionic
```sh
ionic start ionic-tutorial2 sidemenu
# puis démarrer dans le navigateur :
ionic serve
```

## 1. La géolocalisation
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