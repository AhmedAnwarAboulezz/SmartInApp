import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IBeacon, IBeaconDelegate, IBeaconPluginResult } from '@awesome-cordova-plugins/ibeacon/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { ModalController, Platform } from '@ionic/angular';
import { BaseClass } from 'src/app/base/components/base-component';
import { TranslationService } from 'src/app/core/services/localization/translation.service';
import { SignService } from '../services/sign.service';

@Component({
  selector: 'app-test-beacon-region2',
  templateUrl: './test-beacon-region2.component.html',
  styleUrls: ['./test-beacon-region2.component.scss'],
})

export class TestBeaconRegion2Component implements OnInit{
  beaconsList = [];
  //uuid = 'b9407f30-f5f8-466e-aff9-25556b57fe6d';
  //uuid2 = '00000000-0000-0000-0000-000000000000';
  //uuid3 = "E2C56DB5-DFFB-48D2-B060-D0F5A71096E1";
  beaconData = [];
  beaconUuid: String;
  scanStatus: boolean = false;
  private delegate: IBeaconDelegate = null;
  public beaconRegion: any = null;
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
        this.startScanning();
        this.scanStatus = true;
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
      this.startScanning();
      this.scanStatus = true;
    } else {
      this.stopScannning();
      this.scanStatus = false;
    }
  }

  stopScannning(): void {
    // stop ranging
    this.ibeacon.stopRangingBeaconsInRegion(this.beaconRegion)
      .then(async () => {
        console.log(`Stopped ranging beacon region:`, this.beaconRegion);
      })
      .catch((error: any) => {
        console.log(`Failed to stop ranging beacon region: `, this.beaconRegion);
      });
  }

  startScanning() {
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


    // uuid is required, identifier and range are optional.
    this.beaconRegion = this.ibeacon.BeaconRegion('nullBeaconRegion', this.beaconsList[0].uuid);

    this.ibeacon.startRangingBeaconsInRegion(this.beaconRegion)
      .then(() => {
        console.log(`Started ranging beacon region: `, this.beaconRegion);
      })
      .catch((error: any) => {
        console.error(`Failed to start ranging beacon region: `, this.beaconRegion);
      });

    // Subscribe to some of the delegate's event handlers
    this.delegate.didRangeBeaconsInRegion()
      .subscribe(async (pluginResult: IBeaconPluginResult) => {
          this.result = pluginResult;
          if (pluginResult.beacons.length > 0) {
            this.beaconData = pluginResult.beacons;  
            this.changeRef.detectChanges(); // Check for data change to update view Y.Q
            this.beaconsList.forEach(item => {
              item.active = false;
              let data = this.beaconData.find(a=>a.uuid.toLowerCase() == item.uuid.toLowerCase());
              if(data !== null && data !== undefined){
                item.rssi = data.rssi;
                 item.minor = data.minor;
                 item.major = data.major;
                 item.accuracy = data.accuracy;
                 item.TX = data.tx;
                 item.active = true;
              }
            });
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
    this.stopScannning();
    this.disableDebugLogs();
    this.beaconData = [];
    this.beaconsList = [];
    this.modalCtrl.dismiss({ data: beacon });
  }


  close() {
    this.scanStatus = false;
    this.stopScannning();
    this.disableDebugLogs();
    this.beaconData = [];
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