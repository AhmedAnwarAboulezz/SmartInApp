export interface Leave {
    id?: string;
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
