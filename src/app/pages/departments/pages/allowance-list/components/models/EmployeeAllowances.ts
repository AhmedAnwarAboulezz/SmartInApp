export interface EmployeeAllowances {
    id?: string;
    employeeNumber?:string;
    employeeNameFl?:string;
    employeeNameSl?:string;
    administrationFl?:string;
    administrationSl?:string;
    startDate?: Date;
    startDateStr?: string;
    endDate?: Date;
    endDateStr?: string;
    allowanceIn?: number;
    allowanceOut?: number;
    allowanceId?: string;
    allowanceNameFl?: string;
    allowanceNameSl?: string;
    allowanceTypeNameFl?: string;
    allowanceTypeNameSl?: string;
    daysFl?: number;
    daysSl?: number;
    allowanceTypeId?: string;
    employeeAllowanceWeekdays?: any[];
}
export class EmployeeAllowancesSort {
    startDate?: string;
    endDate?: string;
    allowanceIn?: string;
    allowanceOut?: string;
}