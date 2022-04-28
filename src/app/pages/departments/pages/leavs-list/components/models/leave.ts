export interface Leave {
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
    leaveRegulationId?: string;
    leaveNameFl?: string;
    leaveNameSl?: string;
    leaveTypeFl?: string;
    leaveTypeSl?: string;
    payedDay?: number;
    unPayedDay?: number;
    unPayedStartDate?: Date;
}
