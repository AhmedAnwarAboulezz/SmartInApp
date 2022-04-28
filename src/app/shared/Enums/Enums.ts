export enum RequestTypes {
    Leave = '40144a96-b6b3-4aae-bb68-3a9d27c58011',
    Permisiion = '8441f18d-17ba-4974-9f8b-d74472f81522',
    OverTime = '8441f18d-17ba-4974-9f8b-d74472f81533',
    LeaveReturn = '40144a96-b6b3-4aae-bb68-3a9d27c58044',
    FullDayPermision='10efc918-ef1f-409a-a0b3-ee5d35932997'
}

export enum WorkflowStatus {
    Approve = '1e99618b-6294-4786-8b00-2b8e294c66fe',
    Reject = 'b71721e6-eed9-438c-a7d4-a3ff40647f56',
    New = '40144a96-b6b3-4aae-bb68-3a9d27c580e6',
    Waiting = '8441f18d-17ba-4974-9f8b-d74472f8150d'
}
export enum PermissionTimes {
    Start = '10000000-1000-1000-1000-100000000000',
    During = '20000000-2000-2000-2000-200000000000',
    End = '30000000-3000-3000-3000-300000000000'
}
export enum LogType {
    IN = '10000000-1000-1000-1000-100000000000',
    OUT = '20000000-2000-2000-2000-200000000000',
    Rejected = '30000000-3000-3000-3000-300000000000'
}
export enum WeekDays {
    Sunday = '1260f693-bef5-e011-a485-80ee7300c612',
    Monday = '1360f693-bef5-e011-a485-80ee7300c613',
    Tuesday = '1360f693-bef5-e011-a485-80ee7300c614',
    Wednesday = '1360f693-bef5-e011-a485-80ee7300c615',
    Thursday = '1360f693-bef5-e011-a485-80ee7300c616',
    Friday = '1360f693-bef5-e011-a485-80ee7300c618',
    Saturday = '1160f693-bef5-e011-a485-80ee7300c611',

}

export enum StatusType {
    Pending = 1,
    Approval = 2,
    Rejected = 3,
    Removed = 4
}

export enum HeaderFilterType {
    oneDate = 1,
    fromToDates = 2,
    monthYear = 3,
    year = 4
}
