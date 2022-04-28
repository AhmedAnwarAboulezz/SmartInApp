import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from 'src/app/core/services/http/http.service';
import { TranslationService } from 'src/app/core/services/localization/translation.service';
import { IonicStorageService } from 'src/app/core/services/storage/ionicStorageService.service';
import { MainService } from 'src/app/shared/@ui-components/main-header/services/main.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})


export class ProfileComponent implements OnInit {
  claims: any = {};
  employeeImage = './assets/images/user.jpg';
  organizationData: any = {};
  employeedata: any = {};
  // get Service(): HttpService {
  //   return this.mainService;
  // }

   constructor(
    public mainService: MainService,
    public localize: TranslationService,
    public storage :IonicStorageService,
    ) {
    this.employeeImage = './assets/images/user.jpg';

  }



  async ngOnInit() {
    this.organizationData = await this.storage.getObject('user-credentials');
    this.claims = JSON.parse((await this.storage.get('inquiry-claims')).value);
    this.getUserData();

  }

  async getUserData() {
    //this.employeeImage = './assets/images/user.jpg';
    this.getEmployeeData();
    this.getUserImage();
  }

  async getUserImage(){
    let profilePhoto = (await this.storage.get('profile-photo')).value;
    if(profilePhoto == null){
      this.mainService.getEmployeeImage(this.claims.EmployeeId).subscribe(async response => {
        if (response != null && response != "") {
          this.employeeImage = response;
          await this.storage.set('profile-photo', this.employeeImage);
        }
      });
    }
    else{
      this.employeeImage = profilePhoto;
    }   
  }
  
  async getEmployeeData(){
    let profileData = await this.storage.getObject('profile-data');
    if(profileData == null){
      let ids: number[] = [this.claims.EmployeeId];
      this.mainService.getEmployeeData(ids).subscribe(async response => {
        if (response != null && response != "") {
          this.employeedata = response[0];
          await this.storage.setObject('profile-data', this.employeedata);
        }
      });
    }
    else{
      this.employeedata = profileData;
    }    
  }
}
