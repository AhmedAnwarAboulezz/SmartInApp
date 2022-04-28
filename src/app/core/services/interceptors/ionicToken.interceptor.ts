import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError, from, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, finalize, timeout, tap } from 'rxjs/operators';
import { IonicStorageService } from '../storage/ionicStorageService.service';
import { LoadingService } from '../loader/loader.service';
import { Router } from '@angular/router';
import { TranslationService } from '../localization/translation.service';
import { TokenService } from '../auth/TokenService';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastController } from '@ionic/angular';

@Injectable()
export class IonicTokenInterceptor implements HttpInterceptor {
    loaderToShow: any;
    loadingPresent = false;
    private isRefreshing = false;
    private token: any;
    private oldToken: any;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    constructor(
        private loading: LoadingService,
        private storage: IonicStorageService,
        private router: Router,
        public localize: TranslationService,
        private tokenService: TokenService,
        private Toast: ToastController        
    ) { }

     intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> 
     {
        const currLang = this.localize.lang;
        let lang = this.setLang(currLang);
        //alert(request.url);
        return from(this.storage.get('inquiry-token'))
            .pipe(
                switchMap(token => {
                    this.token = token.value;
                    //this.oldToken = token.value;
                      request = this.addToken(request,this.token, lang);
                        if (!request.headers.has('Content-Type')) 
                        {
                            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
                        }
                        //alert(request.url);
                        if(request.url.includes('/assets/') 
                            || request.url.includes('Organizations/') 
                            || request.url.includes('Authentication/') 
                            || request.url.includes('SetUserIsLogedOut')
                            || request.url.includes('UserMangments/ForgetPasswordMobile')
                            || request.url.includes('Users/ResetPasswordUserInquiry')  
                            || this.tokenNotExpired(token.value))
                        {
                            return this.handleRequest(request, next);
                        }
                        else
                        {
                            let refreshTimeoutToken = this.refreshTimeoutToken(request, next, lang, token.value);      
                            return from(refreshTimeoutToken);
                        }
                }));
    }

    tokenNotExpired(token: string) : boolean{
        const helper = new JwtHelperService();  
        let isExpired = helper.isTokenExpired(token); 
        return !isExpired;
    }

    handleRequest(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 
        //this.loading.show();
        return next.handle(request).pipe(
            timeout(300000),
            tap(
                (e: HttpEvent<any>) => {
                    if (e instanceof HttpResponse) {
                        //this.loading.hide();
                    }
                    //this.loading.hide();
                },
                (error: any) => {
                    if (error instanceof HttpErrorResponse) {
                        //this.loading.hide();
                        if (error.status === 401) {
                            let reqToken = request.headers.get('Authorization');
                            let oldheader = `Bearer ${this.oldToken}`
                            if(reqToken !== null && reqToken !== undefined 
                                 && this.oldToken !== null && this.oldToken !== undefined && this.oldToken !== '' 
                                 && oldheader == reqToken)
                            {
                                this.oldToken = null;
                                let currenturl = this.router.url;
                                this.router.navigate([currenturl]);
                            }
                            else{
                              this.tokenService.removeTokens();
                              this.router.navigate(['/login']);
                            }
                        }
                        console.log('error', error);
                    }
                }
            ),
            catchError(e => {
                //this.loading.hide();
                return throwError(e);
            }),
            finalize(() => {
                //this.loading.hide();

            }
            )
        );
      }

    private  addToken(request: HttpRequest<any>, token : any, lang?:any) {
        return request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
            lang: lang ? lang : 'en-US'
          }
        });
        
      }

    setLang(currLang): string {
        let lang;
        switch (currLang) {
            case 'ar': {
                lang = 'ar-EG';
                break;
            }
            case 'en': {
                lang = 'en-US';
                break;
            }
            case 'fr': {
                lang = 'fr-FR';
                break;
            }
            default: {
                lang = 'en-US';
                break;
            }
        }
        return lang;
    }

    private async refreshTimeoutToken(request: HttpRequest<any>, next: HttpHandler, lang?:any, oldtoken?:any): Promise<HttpEvent<any>>  {
        if (!this.isRefreshing) 
        {
          this.isRefreshing = true;
          this.oldToken = oldtoken;
          this.refreshTokenSubject.next(null);
          
          const newToken =  await (this.tokenService.refreshToken());
          
          this.token = newToken.token;
          //this.loading.hide();
          this.isRefreshing = false;
          if(newToken.errorType != null)
          {
            this.tokenService.removeTokens();
            
            await this.toastError(newToken.message, false); 
            setTimeout(() => {
                let url = '/login?error=' + newToken.message;
                this.router.navigateByUrl(url);
              }, 2000);
            return null;
          }
          else
          {
            this.tokenService.updateLocalStorage();
          }
           this.refreshTokenSubject.next(newToken.token);  
        } 
        else
        {
          await this.delay(3000);
        }
        request = this.addToken(request, this.token, lang);
        return this.handleRequest(request, next).toPromise();
      }


      async toastError(message, translate: boolean = true, position: number = 0,duration: number =3000) {
        const toast = await this.Toast.create({
          message: translate ? this.localize.translate.instant('message.' + message) : message,
          animated: true,
          duration: duration,
          position: position == 0 ? 'top': position == 1 ? 'bottom': 'middle',
          color: 'danger',
          cssClass: 'text-center'
        });
        toast.present();
      }

      async toastInformation(message, translate: boolean = true, position: number = 0,duration: number =2000) {
        const toast = await this.Toast.create({
          message: translate ? this.localize.translate.instant('message.' + message) : message,
          animated: true,
          duration: duration,
          position: position == 0 ? 'top': position == 1 ? 'bottom': 'middle',
          color: 'favorite',
          cssClass: 'text-center'
        });
        toast.present();
      }

    
      delay(ms: number) {
        return new Promise( resolve => {
          setTimeout(resolve, ms);
        } );
      }

}

