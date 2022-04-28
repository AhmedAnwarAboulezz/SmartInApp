export interface EmployeesFullDayPermission {
    id?: string;
    startDate?: Date;
    startDateStr?: string;
    endDate?: Date;
    endDateStr?: string;
    fullDayId?: string;
    fullDayPermissionFL?: string;
    fullDayPermissionSL?: string;
    daysFl?: string;
    daysSl?: string;
     employeeNumber?:string;
    employeeNameFl?:string;
    employeeNameSl?:string;
    administrationFl?:string;
    administrationSl?:string;
    fullDayPermissionWeekdays?: any[];
}
