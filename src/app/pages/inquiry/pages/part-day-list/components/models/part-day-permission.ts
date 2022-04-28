export interface PartDayPermission {
    id?: string;
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
