import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IBeacon, IBeaconDelegate, IBeaconPluginResult } from '@awesome-cordova-plugins/ibeacon/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { ModalController, Platform } from '@ionic/angular';
import { BaseClass } from 'src/app/base/components/base-component';
import { TranslationService } from 'src/app/core/services/localization/translation.service';
import { SignService } from '../../services/sign.service';

@Component({
  selector: 'app-test-beacon-region3',
  templateUrl: './test-beacon-region3.component.html',
  styleUrls: ['./test-beacon-region3.component.scss'],
})

export class TestBeaconRegion3Component implements OnInit{
  beaconsList = [];
  //uuid = 'b9407f30-f5f8-466e-aff9-25556b57fe6d';
  //uuid2 = '00000000-0000-0000-0000-000000000000';
  //uuid3 = "E2C56DB5-DFFB-48D2-B060-D0F5A71096E1";
  //beaconData = [];
  beaconUuid: String;
  scanStatus: boolean = false;
  private delegate: IBeaconDelegate = null;
  //public beaconRegion: any = null;
  public iosDevice: boolean = false;
  result:any = {};

  constructor(
    private readonly ibeacon: IBeacon, 
    private readonly platform: Platform, 
    private changeRef: ChangeDetectorRef,
    private modalCtrl: ModalController,
    public service: SignService,
    public localize: TranslationService,
    private base:BaseClass,
    private locationAccuracy: LocationAccuracy

    ) {
      
    this.platform.ready().then(() => {
      this.requestLocPermissoin();
      this.enableDebugLogs();
      this.getDevices();
    });
  }

  getDevices(){
    let locationTest = { lat: 30, lng: 30 };
    this.service.getLocationGps(locationTest).subscribe(result =>{
      this.beaconsList = result.beacons;
      if(result.beacons !== null && result.beacons.length > 0){
        this.validateLocAndBluetooth();
        this.scanStatus = true;
        this.beaconsList.forEach(beacon=>{
          this.startScanning(beacon);

        });
      }
    });
  }

  ngOnInit() {
  }

  requestLocPermissoin(): void {
    // Request permission to use location on iOS
    if (this.platform.is('ios')) {
      this.iosDevice = true;
      this.ibeacon.requestAlwaysAuthorization();
      console.log(`: request ios permisson`);
    }
  }

  enableDebugLogs(): void {
    this.ibeacon.enableDebugLogs();
    this.ibeacon.enableDebugNotifications();
  }
  disableDebugLogs(): void {
    this.ibeacon.disableDebugNotifications();
    this.ibeacon.disableDebugLogs();
  }

  onScanClicked(): void {
    if (!this.scanStatus) {
      this.validateLocAndBluetooth();
      this.beaconsList.forEach(beacon=>{
        this.startScanning(beacon);

      });
      this.scanStatus = true;
    } else {
      this.beaconsList.forEach(beacon=>{
        this.stopScannning(beacon);

      });
      this.scanStatus = false;
    }
  }

  stopScannning(beacon:any): void {
    // stop ranging
    let beaconRegion = this.ibeacon.BeaconRegion('nullBeaconRegion',beacon.uuid);

    this.ibeacon.stopRangingBeaconsInRegion(beaconRegion)
      .then(async () => {
        console.log(`Stopped ranging beacon region:`, beaconRegion);
      })
      .catch((error: any) => {
        console.log(`Failed to stop ranging beacon region: `, beaconRegion);
      });
  }

  validateLocAndBluetooth(){
    this.enableLocation();
    // create a new delegate and register it with the native layer
    this.delegate = this.ibeacon.Delegate();
    this.ibeacon.setDelegate(this.delegate);
    // Check bluetooth status Y.Q
    this.ibeacon.isBluetoothEnabled().then((data) => {
        if(!data){
          this.ibeacon.enableBluetooth();
        }
      },
        (error: any) => console.error('-------=== Disabled', error)
      );
  }


  startScanning(beacon:any) {
    // uuid is required, identifier and range are optional.
    let beaconRegion = this.ibeacon.BeaconRegion('nullBeaconRegion',beacon.uuid);

    this.ibeacon.startRangingBeaconsInRegion(beaconRegion)
      .then(() => {
        console.log(`Started ranging beacon region: `, beaconRegion);
      })
      .catch((error: any) => {
        console.error(`Failed to start ranging beacon region: `, beaconRegion);
      });

    // Subscribe to some of the delegate's event handlers
    this.delegate.didRangeBeaconsInRegion()
      .subscribe(async (pluginResult: IBeaconPluginResult) => {
          this.result = pluginResult;
          this.base.toastInformation("test");
          if (pluginResult.beacons.length > 0) {
            this.base.toastSuccess("test Done");
            let beaconData = pluginResult.beacons;  
            this.changeRef.detectChanges(); // Check for data change to update view Y.Q
            beacon.active = false;
            let data = beaconData.find(a=>a.uuid.toLowerCase() == beacon.uuid.toLowerCase());
            if(data !== null && data !== undefined){
              beacon.rssi = data.rssi;
              beacon.minor = data.minor;
              beacon.major = data.major;
              beacon.accuracy = data.accuracy;
              beacon.TX = data.tx;
              beacon.active = true;
            }
            let element: HTMLElement = document.getElementById('testinIds') as HTMLElement;
            element.click();
            //this.changeRef.detectChanges();
          } 
          else {
            //this.base.toastError("no beacons nearby",false);
            console.log('no beacons nearby');
          }
        },
        (error: any) => {console.error(`Failure during ranging: `, error); alert("Failure during ranging" + error);}
      );   
  }

  selectBeacon(beacon: any){
    this.scanStatus = false;
    this.beaconsList.forEach(beacon=>{
      this.stopScannning(beacon);
    });
    this.disableDebugLogs();
    //this.beaconData = [];
    this.beaconsList = [];
    this.modalCtrl.dismiss({ data: beacon });
  }


  close() {
    this.scanStatus = false;
    this.beaconsList.forEach(beacon=>{
      this.stopScannning(beacon);
    });
    this.disableDebugLogs();
    //this.beaconData = [];
    this.beaconsList = [];
    this.modalCtrl.dismiss({ data: null });
  }

  
  testBtn(){
    this.base.toastSuccess("beacons detected",false);
  }



  enableLocation(){
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
        this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(() => {
            console.log('Request successful');
        },
          error => {
            alert("Please Enable location first to continue");
          }
        );
    });
  }
}