import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { TokenService } from '../auth/TokenService';
import { IonicStorageService } from '../storage/ionicStorageService.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private tokenService: TokenService) { }


  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (this.tokenService.isLoggedIn()) {
      return true;
    } else {
      this.tokenService.removeTokens();
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
    // const token = await this.storageService.get('token');
    // if (token == null) {
    //   this.router.navigate(['/403']);

    // }
    // return true;
  }
}



@Injectable()
export class AuthGuardManager implements CanActivate, CanActivateChild  {
  path: import ('@angular/router').ActivatedRouteSnapshot[];
  route: import ('@angular/router').ActivatedRouteSnapshot;

  constructor(
    private router: Router,
    private storageService: IonicStorageService,
  ) { }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.isManager();
  }

  async canActivate(activatedRoute: ActivatedRouteSnapshot , state: RouterStateSnapshot) {
    return this.isManager();
  }

  async isManager(): Promise<boolean>{
    const isManager = JSON.parse((await this.storageService.get('isManager')).value);
    if(isManager !== undefined && isManager !== null && isManager == true){
      return true;
    }
    else{
      return false;
    }
  }
}


@Injectable()
export class AuthGuardManagerOrTeam implements CanActivate, CanActivateChild  {
  path: import ('@angular/router').ActivatedRouteSnapshot[];
  route: import ('@angular/router').ActivatedRouteSnapshot;

  constructor(
    private router: Router,
    private storageService: IonicStorageService,
  ) { }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.isManagerOrTeam();
  }

  async canActivate(activatedRoute: ActivatedRouteSnapshot , state: RouterStateSnapshot) {
    return this.isManagerOrTeam();
  }

  async isManagerOrTeam(): Promise<boolean>{
    const isManager = JSON.parse((await this.storageService.get('isManager')).value);
    const isTeamMember = JSON.parse((await this.storageService.get('isTeamMember')).value);

    if((isManager !== undefined && isManager !== null && isManager == true) 
    || (isTeamMember !== undefined && isTeamMember !== null && isTeamMember == true)
    ){
      return true;
    }
    else{
      return false;
    }
  }
}