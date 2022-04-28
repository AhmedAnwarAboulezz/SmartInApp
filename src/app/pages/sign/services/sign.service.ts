import { Injectable } from '@angular/core';
import { Camera, CameraPhoto, CameraResultType, CameraSource } from '@capacitor/camera';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { Sign } from '../sign/model/sign.model';


@Injectable({
  providedIn: 'root'
})
export class SignService extends HttpService {

  get baseUrl(): string {
    return 'EmployeeDeviceLogMobiles/';
  }


  getLocationType(locationId): Observable<any> {
      return this.getReqWithUrl(this.serverUrl + `Locations/Get/${locationId}`);
  }

  getLocationGps(locationGps: any): Observable<any> {
    return this.postReqWithUrl(this.serverUrl + 'Locations/LocationProofValidation', locationGps);
  }

  getLastLog(): Observable<any> {
    return this.getReqWithUrl(this.serverUrl + 'EmployeeAttedanceLogs/GetEmployeeLastLog');
  }


  

  public photos: Photo[] = [];
  // constructor() { }


//  public async addNewToGallery() {
//     // Take a photo
//     const capturedPhoto = await Camera.getPhoto({
//       resultType: CameraResultType.Uri, 
//       source: CameraSource.Camera, 
//       quality: 100 
//     });
  
//     this.photos.unshift({
//       filepath: "soon...",
//       webviewPath: capturedPhoto.webPath,
//       base64:capturedPhoto.base64String,
//       formate:capturedPhoto.format,
//       dataUrl:capturedPhoto.dataUrl
//     });
//   console.log('capturedPhoto:',capturedPhoto);
//   console.log('this.photos:',this.photos);
//   }

 saveSign(signData:Sign) {
   console.log(signData);

     return this.postReq('Add', signData);



// this.http.post("http://localhost/api/api/EmployeeDeviceLogMobiles/Add", JSON.stringify(signData))
// .subscribe(data => {
//     console.log('data',data);
// }, error => {
//     console.log('error',JSON.stringify(error.json()));
// });

  }
  public async addNewToGallery() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri, // file-based data; provides best performance
      source: CameraSource.Camera, // automatically take a new photo with the camera
      quality: 100 // highest quality (0 to 100)
    });
  
    // Save the picture and add it to photo collection
    const savedImageFile = await this.savePicture(capturedPhoto);
    this.photos.unshift(savedImageFile);
    console.log('this.photos:',this.photos);
  }


  private async savePicture(cameraPhoto: CameraPhoto) {
    // Convert photo to base64 format, required by Filesystem API to save
    const base64Data = await this.readAsBase64(cameraPhoto);
  
    // Write the file to the data directory
    const fileName = new Date().getTime() + '.jpeg';
    // const savedFile = await Filesystem.writeFile({
    //   path: fileName,
    //   data: base64Data,
    //   directory: FilesystemDirectory.Data
    // });
  
    // Use webPath to display the new image instead of base64 since it's
    // already loaded into memory
    return {
      filepath: fileName,
      webviewPath: cameraPhoto.webPath,
      base64: base64Data,
      formate:cameraPhoto.format,
      dataUrl:base64Data

    };
  }

  private async readAsBase64(cameraPhoto: CameraPhoto) {
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(cameraPhoto.webPath!);
    const blob = await response.blob();
    return await this.convertBlobToBase64(blob) as string;  
  }
  
  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

 
}
interface Photo {
  filepath: string;
  webviewPath: string;
  base64?: string;
  formate?:string;
  dataUrl?:string;
}