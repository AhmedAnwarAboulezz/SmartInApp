export interface PartDayPermissionFilter {
    startDate?: string;
    endDate?: string;
    partialPermissionTypeId?: string[];
    permissionTimeId?: string[];
}


export interface NotificationFilter {
    messageAr?: string;
    messageEn?: string;
    notificationTypeIds?: number[];
    createdDate?: Date;
    version?:string;
}

