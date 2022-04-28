export interface EmployeesDeductions {
    id?: string;
    employeeNumber?:string;
    employeeNameFl?:string;
    employeeNameSl?:string;
    administrationFl?:string;
    administrationSl?:string;
    month?:number;
    year?: number;
    lateIn?: Date;
    earlyOut?: string;
    throwLate?: string;
    total?: string;
    deductionNumberAmount?: string;
    availableBalance?: string;
}
