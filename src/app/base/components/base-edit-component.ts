import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Shell } from './shell';
import { HttpService } from 'src/app/core/services/http/http.service';


export abstract class BaseEditComponent implements OnInit {

    constructor(protected route: ActivatedRoute, private Route: Router) { }
    model: any = {};
    isNew = true;
    id: string;
    abstract get Service(): HttpService;

    protected SubmitNew(): Observable<any> {
        return this.Service.postReq('Add', this.model);
    }
    protected SubmitUpdate(): Observable<any> {
        return this.Service.putReq('Update', this.model);
    }
    protected GetModelFromServer(id: any): Observable<any> {
        return this.Service.getHeaderReq('Get', id);
    }

    Submit(): void {
        if (this.isNew) {
            this.SubmitNew().subscribe((data: any) => {
                if (data.status !== 201) {
                    return false;
                }
                this.Redirect();
            }, error => {
            });
        } else {
            this.SubmitUpdate().subscribe((data: any) => {
                this.Redirect();
            }, error => {
            });
        }
    }

    getRouteParams() {
        this.route.params.subscribe((p: any) => {
            if (p.id != null && p.id !== undefined) {
                this.isNew = false;
                this.id = p.id;
                this.Get(this.id);
            }
        });
    }

    Redirect() {
        const currentRoute = this.Route.url;
        const index = currentRoute.lastIndexOf('/');
        const str = currentRoute.substring(0, index);
        this.Route.navigate([str]);
    }
    Get(id: any): void {
        this.GetModelFromServer(id).subscribe((data: any) => {
            this.model = data.data;
        }, error => {
            console.log(error);
        });
    }

    ngOnInit(): void {
        this.getRouteParams();
    }

}
