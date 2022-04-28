export interface Allowance {
    id?: string;
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
    employeeAllowanceWeekdays?: any[];
}

export class AllowanceSort {
    startDate?: string;
    endDate?: string;
    allowanceIn?: string;
    allowanceOut?: string;
}
