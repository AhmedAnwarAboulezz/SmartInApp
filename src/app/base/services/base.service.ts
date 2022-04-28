import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http/http.service';
//import { LoadOptions } from 'shared/models/loadOpt';

@Injectable({
  providedIn: 'root'
})
export class BaseService extends HttpService {

  get baseUrl(): string {
    return '';
  }

  getGridData(mainUrl: string, filter?: any, loadOpts?: any) {
    return this.postQueryReq(mainUrl, loadOpts, filter);
  }
  
}
