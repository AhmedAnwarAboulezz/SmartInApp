export interface locationCoordinates {
    lat: number;
    lng: number;
  }

  export interface Sign {
    
    employeeId?: string;
    timeEntry?: Date;
    logTypeId?: string;
    terminalSn?: string;
    terminalIp?: string;

    remarkId?: string;
    deviceSn?: string;
    locationLatitude?: string;
    locationLongitude?: string;
    locationsDeviceSn?: string;
    image?: string;
    beaconId?: string;
    timeZone?:string;
}