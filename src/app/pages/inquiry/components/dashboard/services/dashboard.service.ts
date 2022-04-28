import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { LoadOptions } from 'src/app/shared/models';
import { HolidayFilter } from '../../../pages/holiday-list/components/models/filter';

@Injectable({
    providedIn: 'root'
})
export class DashboardService extends HttpService {

    get baseUrl(): string {
        return '';
    }

    // Employee Apis
    getLateRegulations(): Observable<any> {

        return this.getReqWithUrl(this.serverUrl + 'LateRegulations/GetEmployeeDeductionDashboardMobile');

    }

    getEmployeeAttendance(): Observable<any> {

        return this.getReqWithUrl(this.serverUrl + 'Reports/GetEmployeeAttandenceByMonthAndYearMobile');

    }

    getWorkingHours(todaydate) {
       // return this.postQueryReq('Reports/GetWorkingHoursDashboardMobile');

        return this.getReqWithUrl(this.serverUrl + `Reports/GetWorkingHoursDashboardMobile/${todaydate}`);
    }

    getEmployeeDuties(): Observable<any> {
        return this.getReqWithUrl(this.serverUrl + 'EmployeeDuties/GetEmployeeDutyDashboardMobile');

    }
    getHolidays(filter?: HolidayFilter, loadOpts?: LoadOptions) {
        return this.postQueryReq('HolidayDates/GetAllPagedMobile', loadOpts, filter);
    }
    // Manager Apis

    getCombinedManagerData(): Observable<any> {
        return this.getReqWithUrl(this.serverUrl + 'Reports/GetMobileDashboardCounts');

    }

    // getTree(): Observable<TreeItem[]> {
    //     return this.postReqWithUrl(`${this.serverUrl}AdministrativeLevels/GetTreeMobile`, []);
    //   }
      getEmployeePermissions(partialPermissionTypeId: any): Observable<any> {
        return this.getReqWithUrl(this.serverUrl + `EmployeePermissions/GetEmployeePermissionDashboardMobile/${partialPermissionTypeId}`);

    }
    getEmployeeLeaves(leaveTypeId: any): Observable<any> {
        return this.getReqWithUrl(this.serverUrl + `EmployeeLeaves/GetLeaveBalanceDashboardMobile/${leaveTypeId}`);

    }
      getPermissionTypes(): Observable<any> {
        return this.http.get(this.serverUrl + 'PartialPermissionTypes/GetAllDropdownListMobile');
    }

    getLeaveTypes(): Observable<any> {
        return this.http.get(`${this.serverUrl}LeaveRegulations/GetDropdownList/00000000-0000-0000-0000-000000000000`);
    }
}
