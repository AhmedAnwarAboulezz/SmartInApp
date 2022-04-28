import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { APIURL } from '../Apis/api';
import { Router } from '@angular/router';
import {  Observable } from 'rxjs';

// import { Shell } from 'base/components/shell';
import { JwtHelperService } from "@auth0/angular-jwt";
import { TokenService } from './TokenService';
import { Shell } from 'src/app/base/components/shell';
 
@Injectable({
  providedIn: 'root'
})

/**
 * Auth Services
 * the main service for authentications
 */
export class AuthService extends HttpService {


  get Router(): Router { return Shell.Injector.get(Router); }
  get baseUrl(): string {
    return 'Authentication/';
  }
  public  userProfile:UserProfile={claims:null,isManager:false,organizationData:null} ;

  login(loginData): Observable<any> {
    return this.postReq(APIURL.loginMobile, loginData);
  }

  // redirectToLogin(): void {
  //   this.Router.navigate(['/login']);
  // }

  changePassword(model): Observable<any> {
    return this.http.post(this.serverUrl + APIURL.changePassword, model);
  }
  forgetPassword(model) {
    return this.http.post(this.serverUrl + APIURL.forgetPassword,model);
  }
  resetPassword(model): Observable<any> {
    return this.http.post(this.serverUrl + APIURL.resetPasswordUserInquiry, model);
  }
  getOrganiztionByCode(orgCode): Observable<any> {
    return this.http.get(`${this.mainServerUrl}Organizations/GetOrganizationWithHostsByCode/${orgCode}`);
  }
  setHost(hostUrl) {
    this.serverUrl = hostUrl;
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
  validateToken(token)
  {   
     const helper = new JwtHelperService();
    console.log('start checkToken :',token);
    const decodedToken = helper.decodeToken(token);
     console.log('decodedToken:',decodedToken);
    const isExpired = helper.isTokenExpired(token);
    if(!isExpired){
      this.userProfile.claims= decodedToken;
    }
    return !isExpired;
  }

  
}

  interface UserProfile{
  isManager:boolean,
  organizationData:any,
  claims:any
}
