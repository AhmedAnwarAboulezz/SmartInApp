export interface EmployeePartDayPermission {
    id?: string;
    employeeNumber?:string;
    employeeNameFl?:string;
    employeeNameSl?:string;
    administrationFl?:string;
    administrationSl?:string;
    startDate?: Date;
    startDateStr?: string;
    startTime?: string;
    endTime?: string;
    partialPermissionTypeId?: string;
    partialPermissionFL?: string;
    partialPermissionSL?: string;
    permissionTimeId?: string;
    permissionTimeNameFl?: string;
    permissionTimeNameSl?: number;
    permissionDuration?: number;
}
