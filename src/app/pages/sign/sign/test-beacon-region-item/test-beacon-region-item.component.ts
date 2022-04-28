import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBeacon, IBeaconDelegate, IBeaconPluginResult } from '@awesome-cordova-plugins/ibeacon/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, Subject } from 'rxjs';
import { pairwise } from 'rxjs/operators';
import { BaseClass } from 'src/app/base/components/base-component';
import { TranslationService } from 'src/app/core/services/localization/translation.service';

@Component({
  selector: 'app-test-beacon-region-item',
  templateUrl: './test-beacon-region-item.component.html',
  styleUrls: ['./test-beacon-region-item.component.scss'],
})
export class TestBeaconRegionItemComponent implements OnInit {

  scanStatusValue = false;
  @Input() scanStatus:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  @Input() beacon: any;
  @Input() beaconIndex: any;
  @Input() lastIndex: any;
  @Input() scaningIndex:BehaviorSubject<number> = new BehaviorSubject<number>(0);
  @Input() iosDevice: boolean;

  @Output() finished: EventEmitter<any> = new EventEmitter();
  @Output() selectBeaconScan: EventEmitter<any> = new EventEmitter();

  

   beaconData = [];
   private delegate: IBeaconDelegate = null;
   public beaconRegion: any = null;
   result:any = {};
   startTime = 0;
   endTime = 1000;
   scannig = false;
  timeScannig = 5000;
  counter = 0;



  constructor(
    private readonly ibeacon: IBeacon, 
    private readonly platform: Platform, 
    private changeRef: ChangeDetectorRef,
    public localize: TranslationService,
    private base:BaseClass,
  ) { }

  ngOnInit() {
    this.startTime = (this.beaconIndex) * this.timeScannig; 
    this.endTime = (this.startTime+this.timeScannig)-2;
    this.startScanningTime();
    this.endScanningTime();
      this.scanStatus.subscribe(response => {
      this.scanStatusValue = response;
   });
    this.scaningIndex.pipe(pairwise()).subscribe(([previous, current]) => {
      if(this.scanStatusValue == false){
        this.scannig = false;
        this.stopScanning();
        this.disableDebugLogs();
        this.finished.emit(true);
      }
      else if (previous !== current && current == this.beaconIndex && this.counter !== 0) {
        // console.log("previous ", previous);
        // console.log("current ", current);  
        this.scanningInTime();
      }
    });
  //   this.scaningIndex.subscribe(response => {
  //     console.log(response);
  //     // if(response == this.beaconIndex && this.counter !== 0){
  //     //   //this.startScanningTime();
  //     //   //this.scannig = true;
  //     //   debugger;
  //     //   this.scanningInTime();
  //     // }
  //     // else{
  //     //   this.scannig = false;
  //     // }
  //  });
  //   this.scanStatus.subscribe(response => {
  //     console.log(response);
  //     this.scanStatusValue = response;
  //     if(response){
  //       this.startScanningTime();
  //       this.endScanningTime();
  //     }
  //     else{
  //       this.stopScanning();
  //     }
  //  });
  }
  scanningInTime(){
    this.scannig = true;
    this.enableDebugLogs();
    this.startScanning();
    this.scaningIndex.next(this.beaconIndex);

    setTimeout(() => {
      this.scannig = false;     
      this.stopScanning();
      this.disableDebugLogs();
      this.scaningIndex.next(this.beaconIndex+1);
      if((this.beaconIndex +1) == this.lastIndex && this.scanStatusValue == true) {
        //alert("last index scanning in time");
        this.finished.emit(true);
      }
    }, (this.timeScannig -2));
    
  }

  startScanningTime(){
    setTimeout(() => {
      this.counter++;
      this.scannig = true;
      this.enableDebugLogs();
      this.startScanning();
      this.scaningIndex.next(this.beaconIndex);
    }, this.startTime);
    
  }
  endScanningTime(){
    setTimeout(() => {
      this.scannig = false;
      this.stopScanning();
      this.disableDebugLogs();
      this.scaningIndex.next(this.beaconIndex+1);
      if((this.beaconIndex +1) == this.lastIndex && this.scanStatusValue == true) {
        //alert("last index scanning init");
        this.finished.emit(true);
      }
    }, this.endTime);
  }

 

  enableDebugLogs(): void {
    this.ibeacon.enableDebugLogs();
    this.ibeacon.enableDebugNotifications();
  }
  disableDebugLogs(): void {
    this.ibeacon.disableDebugNotifications();
    this.ibeacon.disableDebugLogs();
  }

  stopScanning(): void {
    //this.scannig = false;
    this.ibeacon.stopRangingBeaconsInRegion(this.beaconRegion)
      .then(async () => {
        console.log(`Stopped ranging beacon region:`, this.beaconRegion);
      })
      .catch((error: any) => {
        console.log(`Failed to stop ranging beacon region: `, this.beaconRegion);
      });
  }

  startScanning() {
    //this.scannig = true;
    this.beacon.active = false;
    this.delegate = this.ibeacon.Delegate();
    this.ibeacon.setDelegate(this.delegate);
    this.ibeacon.isBluetoothEnabled().then((data) => {
        if(!data){
          this.ibeacon.enableBluetooth();
        }
      },
        (error: any) => console.error('-------=== Disabled', error)
      );
    this.beaconRegion = this.ibeacon.BeaconRegion(this.beacon.nameFl, this.beacon.uuid);
    this.ibeacon.startRangingBeaconsInRegion(this.beaconRegion)
      .then(() => {
        console.log(`Started ranging beacon region: `, this.beaconRegion);
      })
      .catch((error: any) => {
        console.error(`Failed to start ranging beacon region: `, this.beaconRegion);
      });

    this.delegate.didRangeBeaconsInRegion()
      .subscribe(async (pluginResult: IBeaconPluginResult) => {
          this.result = pluginResult;
          if (pluginResult.beacons.length > 0) {
            this.beaconData = pluginResult.beacons;  
            this.changeRef.detectChanges();
            //this.beacon.active = false;
              let data = this.beaconData.find(a=>a.uuid.toLowerCase() == this.beacon.uuid.toLowerCase());
              if(data !== null && data !== undefined){
                this.beacon.rssi = data.rssi;
                this.beacon.minor = data.minor;
                this.beacon.major = data.major;
                this.beacon.accuracy = data.accuracy;
                this.beacon.TX = data.tx;
                this.beacon.active = true;
                //this.scannig = true;
              }
            let element: HTMLElement = document.getElementById('testinIds') as HTMLElement;
            element.click();
          } 
          else {
            console.log('no beacons nearby');
            //this.scannig = false;
          }
        },
        (error: any) => {
          console.error(`Failure during ranging: `, error);
          alert("Failure during ranging" + error);
          //this.scannig = false;
      });   
  }

  testBtn(){
    this.base.toastSuccess("beacons detected",false);
  }

  selectBeacon(){
    this.selectBeaconScan.emit(this.beacon);
  }


   // startScanningTime(){
  //   setTimeout(() => {
  //     this.startScanning();
  //   }, this.startTime);
    
  // }
  // endScanningTime(){
  //   setTimeout(() => {
  //     this.stopScanning();
  //     if((this.beaconIndex +1) == this.lastIndex) {
  //       this.finished.emit(true);
  //     }
  //   }, this.endTime);
  // }

}
