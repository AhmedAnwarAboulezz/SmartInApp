import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpServiceBaseService } from 'src/app/base/services/http-service-base.service';
import { Observable, throwError } from 'rxjs';
import { ConfigService } from '../config/config.service';
import { catchError, timeout } from 'rxjs/operators';
import { TokenService } from '../auth/TokenService';
import { GlobalVars } from 'src/app/shared/constants';
@Injectable({
  providedIn: 'root'
})

/**
 * Manipulate the HTTP requests for the whole app
 * handle the main POST, GET, UPDATE, DELETE methods
 */
export abstract class HttpService extends HttpServiceBaseService {

  public serverUrl = this.configService.getServerUrl();
  public notificationUrl = this.configService.getNotificationUrl();
  public  Timeout = 300000;
  public mainServerUrl = this.configService.getConfigServerUrl();
  //public serverUrl = GlobalVars.serverUrl !== null && GlobalVars.serverUrl !== undefined && GlobalVars.serverUrl !== "" ? GlobalVars.serverUrl :this.configService.getServerUrl();

  constructor(public http: HttpClient, private configService: ConfigService) {
    super();
    this.serverUrl = this.configService.getServerUrl();
  }

  /* Get Lookup */
  getAttendanceStatus(url: string, data?: any) {
    return this.http.get(this.serverUrl + this.baseUrl + url, data)
    .pipe(
      catchError(this.handleError()), timeout(this.Timeout)
    );
  }

  /* Post */
  postReq(url: string, data: any) {
    // return this.http.post(this.serverUrl + this.baseUrl + url, data);
    return this.http.post(this.serverUrl + this.baseUrl + url, data)
    .pipe(
      catchError(this.handleError()), timeout(this.Timeout)
    );

  }
  postReqWithUrl(url: string, data: any) {
    return this.http.post( url, data) .pipe(
      catchError(this.handleError()), timeout(this.Timeout)
    );
  }
  /* Get  */
  getReq(url: string, data?: any) {
    return this.http.get(this.serverUrl + this.baseUrl + url, data)
    .pipe(
      catchError(this.handleError()), timeout(this.Timeout)
    );
  }
  getReqWithUrl(url: string, data?: any) {
    return this.http.get( url, data)
    .pipe( catchError(this.handleError()), timeout(this.Timeout));
  }
  /* Get Paged */
  getPaged(url: string, data: any): Observable<any> {
    return this.http.post(this.serverUrl + this.baseUrl + url, data)
    .pipe(
      catchError(this.handleError()), timeout(this.Timeout)
    );
  }

  /* Get With Query Parameters */
  getQueryReq(url: string, params?: any) {
    return this.http.get(this.serverUrl + this.baseUrl + url, { params })
    .pipe(
      catchError(this.handleError()), timeout(this.Timeout)
    );
  }

  /* Post With Query Parameters */
  postQueryReq(url: string, params?: any, data?: any) {
    // console.log('serverUrl', this.serverUrl + this.baseUrl + url);
    return this.http.post(this.serverUrl + this.baseUrl + url, data, { params })
    .pipe(
      catchError(this.handleError()), timeout(this.Timeout)
    );
  }
  /* Get With Url Parameter  */
  getHeaderReq(url: string, data: string) {
    return this.http.get(this.serverUrl + this.baseUrl + url + '/' + data)
    .pipe(
      catchError(this.handleError()), timeout(this.Timeout)
    );
  }
  // getHeaderReqWithUrl(url: string, data: string) {
  //   return this.http.get( url + '/' + data).pipe(
  //     catchError(this.handleError())
  //   );
  // }
  /* Put Lookup */
  putReq(url: string, data?: any) {
    return this.http.put(this.serverUrl + this.baseUrl + url, data)
    .pipe(
      catchError(this.handleError()), timeout(this.Timeout)
    );
  }
  /* Delete Lookup */
  deleteReq(url: string, data?: any) {
    return this.http.delete(this.serverUrl + this.baseUrl + url + '/' + data)
    .pipe(
      catchError(this.handleError()), timeout(this.Timeout)
    );
  }

  private handleError() {

    return (error: any): Observable<any> => {
      const message = this.getErrorMessage(error);
      if (message) {
        console.log('alert error: ', message);
        // this.alertService.openAlert(message);
      }
      return throwError(message);
    };
  }

  getErrorMessage(error): string {
    let message = '';

    if (error.status === 400) {

      const errors: Array<any> = error.error.errors;
      if (errors instanceof Object) {
        Object.keys(errors).forEach((key) => {
          message += errors[key][0] + '\n';
        });
      } else if (typeof error.error === 'string') {
        // the error is validation error BadRequest('error message')
        message = error.error;
      } else {
        message = 'Bad Request';
      }

    } else if (error.status === 500) {
      console.log('error.status',error);
      
      message = error.error;
      // message = 'Unexpected error happened.';
    } else {
      message = error.message;
    }

    return message;
  }


  resetHost() {
    this.serverUrl = this.configService.getServerUrl();
  }

}
