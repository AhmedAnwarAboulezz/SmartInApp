import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { createTranslateLoader } from './shared/translation/app.lazy.translation.module';
import { SharedModule } from './shared/shared.module';
//import { CoreModule } from './core/core.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ConfigService } from './core/services/config/config.service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicTokenInterceptor } from './core/services/interceptors/ionicToken.interceptor';
import { CoreModule } from './core/core.module';
import { FCM } from '@ionic-native/fcm/ngx';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
// import { IBeacon } from '@ionic-native/ibeacon/ngx';
import { NativeGeocoder } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { IBeacon } from '@awesome-cordova-plugins/ibeacon/ngx';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}
const initializerConfigFn = (appConfig: ConfigService) => {
  return () => {
    return appConfig.loadAppConfig();
  };
};
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      },
    }),
  ],
  
  providers: [
    FCM,
    Geolocation,
    NativeGeocoder,
    Camera,
    LocationAccuracy,
    IBeacon,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: IonicTokenInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializerConfigFn,
      multi: true,
      deps: [ConfigService],
    },
    FingerprintAIO,
    //IBeacon
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
