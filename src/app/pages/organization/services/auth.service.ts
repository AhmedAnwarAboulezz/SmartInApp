import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {  Observable } from 'rxjs';

// import { Shell } from 'base/components/shell';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Shell } from 'src/app/base/components/shell';
import { HttpService } from 'src/app/core/services/http/http.service';
import { APIURL } from 'src/app/core/services/Apis/api';
 
@Injectable({
  providedIn: 'root'
})

/**
 * Auth Services
 * the main service for authentications
 */
export class OrganizationService extends HttpService {


  get Router(): Router { return Shell.Injector.get(Router); }
  get baseUrl(): string {
    return 'Organizations/';
  }
  
  getOrganiztionByCode(orgCode): Observable<any> {
    return this.http.get(`${this.mainServerUrl}Organizations/GetOrganizationWithHostsByCode/${orgCode}`);
  }

 checkToken(myRawToken)
  {  
    const helper = new JwtHelperService();
    console.log('start checkToken :',myRawToken);
    const decodedToken = helper.decodeToken(myRawToken);
    console.log('decodedToken:',decodedToken);
    const expirationDate = helper.getTokenExpirationDate(myRawToken);
    console.log('expirationDate:',expirationDate);
    const isExpired = helper.isTokenExpired(myRawToken);
    console.log('isExpired:',isExpired);
  }
  
}

  interface UserProfile{
  isManager:boolean,
  organizationData:any,
  claims:any
}
