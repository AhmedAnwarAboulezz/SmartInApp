import { Component, OnInit } from '@angular/core';
import {  ModalController, NavController } from '@ionic/angular';
import { FormGroup } from '@angular/forms';
import { locationCoordinates, Sign } from './model/sign.model';
import { SignService } from '../services/sign.service';
import { Platform } from '@ionic/angular';
import { DomSanitizer ,SafeResourceUrl } from '@angular/platform-browser';
import { TestBeaconRegion2Component } from '../test-beacon-region2/test-beacon-region2.component';
import { Router } from '@angular/router';
import { Events } from 'src/app/base/services/events.service';
import { BaseClass } from 'src/app/base/components/base-component';
import { CameraDirection, CameraResultType, CameraSource } from '@capacitor/camera';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { IonicStorageService } from 'src/app/core/services/storage/ionicStorageService.service';
//import * as moment from 'moment';
import * as moment from 'moment-timezone';
import { TestBeaconRegionComponent } from './test-beacon-region/test-beacon-region.component';
import { TestBeaconRegion3Component } from './test-beacon-region3/test-beacon-region3.component';
import { TestBeaconRegion4Component } from './test-beacon-region4/test-beacon-region4.component';
@Component({
  selector: 'app-sign',
  templateUrl: './sign.page.html',
  styleUrls: ['./sign.page.scss'],
})
export class SignPage implements OnInit {
  form: FormGroup;
  imgUrl = '';
  devices: any[] = [];
  beacons: any[] = [];
  imageTest: string= '';
  image: SafeResourceUrl;
  signData: Sign = {
    logTypeId: '10000000-1000-1000-1000-100000000000'
    , remarkId: '1360f693-bef5-e011-a485-80ee7300c617'
  };
  activated = false;
  currentLocation = {
    active: false,
    nameFl: "Enable Location First!"
  };
  theSate = false;
  address: any;
  beaconInfo: any;
  locationProofEnum = LocationProofEnum;
  locationType: any;
  lastLog:any;
  timeZone = new Date();
  constructor(
    private navCtrl: NavController,
    public platform: Platform,
    private events: Events,
    private router: Router,
    public modalController: ModalController,
    private domSanitizer: DomSanitizer,
    public service: SignService,
    public base: BaseClass,
    private faio: FingerprintAIO,
    private nativeGeocoder: NativeGeocoder,
    private geolocation: Geolocation,
    private camera: Camera,
    private locationAccuracy: LocationAccuracy,
    //private localStorage: StorageService,
    private storage: IonicStorageService
  ) { }
  async ngOnInit() {
    let claims = JSON.parse((await this.base.storage.get('inquiry-claims')).value);
    const currentLocation = await this.service.getLocationType(claims.LocationId).toPromise();
    this.getLastLog();
    this.locationType = currentLocation.typeId;
    if(this.locationType !== this.locationProofEnum['beacon']){
     await this.locateUser(false);
    }
    else{
      this.checkValidLocationAndBeacons(true);
    }
  }
  ionViewWillEnter() {
    this.events.publish('pages:title', { title: 'cards.makeSign' });
    this.events.publish('pages:showBackButton', { showBackButton: false,showMenuButton: true });
  }
  getLastLog(){
    this.service.getLastLog().subscribe(log =>{
      this.lastLog = log;
      if(this.lastLog.logTypeId == '10000000-1000-1000-1000-100000000000'){
        this.signData.logTypeId = '20000000-2000-2000-2000-200000000000'
      }
      else{
        this.signData.logTypeId = '10000000-1000-1000-1000-100000000000'
      }
    });
  }
   async onSubmit() {
    console.log('start');
    //await this.getDeviceInfo();
    if(this.locationType !== this.locationProofEnum['beacon']){
      await this.locateUser(true);  
    }
    else{
      this.saveSign();
    }
  }
  async saveSign() {
    let timeZone = this.getTimezoneName();
    let timeZone2 = moment.tz.guess();
    if(timeZone2.includes("/")){
      timeZone2 = timeZone2.split('/')[1];
    }
    let deviceToken = (await this.storage.get('device-token')).value;
    this.signData.deviceSn = deviceToken;
    this.signData.timeZone = timeZone2;
    console.log('before this.signData:', this.signData);
    this.service.saveSign(this.signData).subscribe(async data => {
        console.log('data', data);
        this.base.toastSuccess('yourSignAddedSuccessfully');
        //await this.delay(1000);
        //window.location.reload();
        this.router.navigate([`/home/inquiry/`], {replaceUrl: true});
      }, error => {
        console.log('error', error);
        this.base.toastError(error, false);
      });
  }
  ValidAIO() {  
    return this.faio.show({
      title: 'Authentication Required',
      subtitle: 'use fingerprint to allow take a picture',
      description: 'use fingerprint to allow take a picture',
      fallbackButtonTitle: 'Use Backup',
      disableBackup: true,
    });    
  }
  async validAio(): Promise<boolean>{
    var AIO='';
    let result = await this.ValidAIO();
    console.log('Biometric :',result);
    if(!this.platform.is('ios')) result = result.split('_')[1];
    AIO=result.toLowerCase();
    if(AIO=='success'){
        return true;
    }
    else{
      return false;
    }
  }

  // ValidAIO() {  
  //   try {
  //     this.faio.show({
  //     title: 'Authentication Required',
  //     subtitle: 'use fingerprint to allow take a picture',
  //     description: 'use fingerprint to allow take a picture',
  //     fallbackButtonTitle:'Use Backup',
  //     disableBackup:true,
  //     })
  //     .then((result: any) => alert(result))
  //     .catch((error: any) => alert(error));
  //     } catch (e) {
  //     alert('catch ' + e);
  //     }
  //     return true;
  // }
  // async validAio(): Promise<boolean>{
  //   return await this.ValidAIO();
  // }
  async takePicture() {
    if ((this.platform.is('android') || this.platform.is('ios')) && this.platform.is('hybrid')) {
      let valid = await this.validAio();
       if(!valid){
         return false;
       }
    }  
    const options: CameraOptions = {
      quality: 10,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: false,
      sourceType:1,
      targetHeight:300,
      correctOrientation: true,
      cameraDirection:1
    }
    this.camera.getPicture(options).then((imageData) => {
     let base64Image = 'data:image/jpeg;base64,' + imageData;
     this.imageTest = base64Image;
     this.signData.image = base64Image;
      }, (err) => {
      alert("Camera Error " + err);
     // Handle error
    });
    // const { Camera } = Plugins;
    // let result = await Camera.getPhoto({
    //   quality: 100,
    //   allowEditing: false,
    //   source: CameraSource.Camera,
    //   resultType: CameraResultType.DataUrl,
    //   height: 300,
    //   //width: 100,
    //   //saveToGallery: true,
    //   //webUseInput: true,
    //   direction: CameraDirection.Front,
    //   correctOrientation: true,
    // });
    // this.imageTest = result.dataUrl;
    // this.signData.image = result.dataUrl;
    // this.signData.deviceSn = result.exif.Model;
    // this.image = this.domSanitizer.bypassSecurityTrustResourceUrl(result && (result.dataUrl));
  }
  RunlocationAccuracy(save: boolean){
    this.base.showLoader();
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
        this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(() => {
            console.log('Request successful');
            this.locatLocationUser(save);
        },
          error => {
            console.log('Error requesting location permissions', error);  
            this.base.hideLoader();
            alert("Please Enable location first to continue");
            this.currentLocation.nameFl = "Enable Location First!";
            this.currentLocation.active = false;
            this.activated = false;
          }
        );
    });
  }
  async locateUser(save: boolean) {
    // if (!Capacitor.isPluginAvailable('Geolocation')) {
    //   alert("location not available");
    //   return;
    // }
    this.RunlocationAccuracy(save);
  }
  async locatLocationUser(save: boolean){
    await this.geolocation.getCurrentPosition()
    .then(geoPosition => {        
      const coordinates: locationCoordinates = {
        lat: geoPosition.coords.latitude,
        lng: geoPosition.coords.longitude
      };
      this.signData.locationLatitude = coordinates.lat.toString();
      this.signData.locationLongitude = coordinates.lng.toString();
      this.base.hideLoader();
      this.checkValidLocationAndBeacons(false);
      if(save){
        this.saveSign();
      }
      return true;
    })
    .catch(err => {
      this.base.hideLoader();
      alert("Please Enable location first to continue");
      this.currentLocation.active = false;
      this.activated = false;
      return false;
    });
  }
  checkValidLocationAndBeacons(isBeacon: boolean){
    this.activated = false;
    this.currentLocation.active = false;
    this.currentLocation.nameFl == "Enable Location First!";
    let locationTest = {
      lat: isBeacon ? 30 : this.signData.locationLatitude,
      lng: isBeacon ? 30 :this.signData.locationLongitude
    }
    this.base.showLoader();
    if(!isBeacon){
      if (this.platform.is('cordova'))
      {
         this.reverseGeoCode(locationTest);
      }  
    }
    this.service.getLocationGps(locationTest).subscribe(result =>{
      this.base.hideLoader();
      this.currentLocation.active = result.inLocation;
      //alert("location Test" + result.address.display_name);
      if(this.currentLocation.nameFl == "Enable Location First!"){
        this.address = result.address;
        this.currentLocation.nameFl = result.address.display_name;
      }
      if((!isBeacon && result.inLocation)){
        this.activated = true;
      }
      this.beacons = result.beacons;
    }, error => {
      alert("an error Happened!")
      this.base.hideLoader();
    });
  }
  reverseGeoCode(locationTest : any){
    let options: NativeGeocoderOptions = {
      useLocale: false,
      maxResults: 1,
      defaultLocale: this.base.isEnglish() ? 'en-US' : 'ar-EG'
      };
    this.nativeGeocoder.reverseGeocode(+locationTest.lat, +locationTest.lng, options)
    .then((result: NativeGeocoderResult[]) => {
      this.address = result;
      if(result!== null && result !== undefined && result.length > 0){
        this.currentLocation.nameFl =
        result[0].subThoroughfare + " " +
        result[0].thoroughfare + " " +
        result[0].locality + " " +
        result[0].subAdministrativeArea;
        //alert("reverse Geo" + this.currentLocation.nameFl);
      }
    })
    .catch((error: any) => {
      alert("reverse Geo error" +error);
      console.log(error)  
    });
  }
  // async getDeviceInfo() {
  //   const info = await Device.getInfo();
  //    this.signData.terminalSn = info.uuid;
  // }
  async showBeaconModal(type:number) {
    const modal = await this.modalController.create({
      component: type == 2 ? TestBeaconRegion2Component : type == 1 ? TestBeaconRegionComponent:TestBeaconRegion4Component
      //componentProps: { devices: this.beacons }
    });
    await modal.present();
    const data = (await modal.onWillDismiss()).data.data;
    if (data !== null && data !== undefined) {
      this.beaconInfo = data;
      this.signData.beaconId = this.beaconInfo.id;
      this.activated = true;
    }
    else{
      this.beaconInfo = null;
      this.signData.beaconId = null;
      this.activated = false;
    }
  }
  close() {
    this.navCtrl.pop();
    console.log(this.navCtrl);
  }
  stateChange(event){
    if(event == false){
      this.signData.logTypeId = '10000000-1000-1000-1000-100000000000';
    }
    if(event == true){
      this.signData.logTypeId = '20000000-2000-2000-2000-200000000000';
    }
  }
  getTimezoneName(): string {
    return new Date().toLocaleDateString(undefined, {day:'2-digit',timeZoneName: 'long' }).substring(4);
  }
  delay(ms: number) {
    return new Promise( resolve => {
      setTimeout(resolve, ms);
    } );
  }
}
export enum LocationProofEnum
{
    point = 0,
    polygon = 1,
    beacon = 2
}