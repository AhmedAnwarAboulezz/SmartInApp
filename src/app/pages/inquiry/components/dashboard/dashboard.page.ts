import { Time } from '@angular/common';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ApexChart, ApexLegend, ApexLocale, ApexPlotOptions, ApexYAxis } from 'ng-apexcharts';
import { Subscription } from 'rxjs';
import { TranslationService } from 'src/app/core/services/localization/translation.service';
import { OverPageModalService } from 'src/app/shared/@ui-components/over-page-modal/over-page-modal.service';
import { RequestTypes } from 'src/app/shared/Enums/Enums';
import { LoadOptions } from 'src/app/shared/models';
import { HolidayFilter } from '../../pages/holiday-list/components/models/filter';
import { DashboardService } from './services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  @ViewChild('filterContent', { read: TemplateRef })
  filterContent: TemplateRef<any>;
  enabledFilter = false;
  filter = {
    partialPermissionTypeId: null,
    leaveTypeId: null,
  }

  showPermissonFilter = false;
  showLeaveFilter = false;
  
  initChartObj = {
    val: [0],
    color: ['#62CD68'],
    type: 'donut',
    labels: ['In Time'],
    totalLabel: 'Miute',
  };
  initChartObj2 = [['sun','mon','tues','wednesday','thrs','fri','sat'], [0,0,0,0,0,0,0], [0,0,0,0,0,0,0]];
  // initChartObj3 = [{
  //   publicHolidayNameFl: 'Test',
  //   publicHolidayNameSl: 'تجريبي',
  //   startDate: '2021-12-29T00:00:00',
  //   endDate: '2022-01-02T00:00:00',
  // }];
  attendance:any;
  lates:any;
  permissions:any;
  leaves:any;

  workingHours: any;

  isLoading = true;
  permissionTypes: any;
  leaveTypes: any;
  //leaveTypeId: any;
  //partialPermissionTypeId: any;

  employeeAttendancelabels = [];
  employeeAttendanceValues = [];
  employeeAttendanceColors = [];
  employeeAttendanceShow = false;


  employeeLatelabels = [];
  employeeLateValues = [];
  employeeLateColors = [];
  employeeLateShow = false;


  employeePermissionlabels = [];
  employeePermissionValues = [];
  employeePermissionColors = [];
  employeePermissionShow = false;

  employeeLeavelabels = [];
  employeeLeaveValues = [];
  employeeLeaveColors = [];
  employeeLeaveShow = false;



  attendanceLabelUrl = [
    'home/inquiry/attendance-list/list?filterName="present"&filterId={1,17,18}',
    'home/inquiry/attendance-list/list?filterName="weekend"&filterId=9',
    'home/inquiry/attendance-list/list?filterName="restday"&filterId=10',
    'home/inquiry/attendance-list/list?filterName="holiday"&filterId=13',
    'home/inquiry/attendance-list/list?filterName="absence"&filterId=11'
  ];
  lateLabelUrl = [
    'home/inquiry/attendance-list/list?filterName="late"&filterId=12',
    'home/inquiry/attendance-list/list?filterName="late"&filterId=12',
    'home/inquiry/attendance-list/list?filterName="late"&filterId=12',
  ];

  dayDate = '';
  oldDate = '';
  currentDate = new Date();
  isCurrentDate = true;
  sumWorkingHour = 0;
  sumExpectedWorkingHour = 0;
  private subWorkingHours: Subscription;
  private subHolidays: Subscription;
  private subEmployeeDuties: Subscription;
  duty: any = {};

  holidayDates: any;
  holidayList: any[] = [];
  holidayFilter: HolidayFilter = {
    startDate: new Date().toLocaleDateString('en-US')
    , endDate: new Date(new Date().getFullYear()+1, 11, 31).toLocaleDateString('en-US')
  };
  opt: LoadOptions = {
    limit: 3,
    offset: 1,
    sortDirection: 'ascending',
    sortField: 'startDate'
  };
showHoliday = false;
  constructor(
    public localize: TranslationService,
    public dashboardService: DashboardService,
    public modal: OverPageModalService,
    private router: Router


  ) {
    this.currentDate.setDate(this.currentDate.getDate() - 1);
  }

  ngOnInit() {
    this.isLoading = true;
    this.attendance = this.initChart(this.initChartObj);
    this.lates = this.initChart(this.initChartObj);
    this.permissions = this.initChart(this.initChartObj);
    this.leaves = this.initChart(this.initChartObj);
    this.workingHours = this.initBarChart(this.initChartObj2);
    //this.holidayDates = this.initTimelineChart(this.initChartObj3);
    this.dayDate = moment(this.currentDate).format("YYYY-MM-DD");
    let fixDate = new Date(this.dayDate);
    fixDate.setDate(fixDate.getDate() - 6);
    this.oldDate = moment(fixDate).format("YYYY-MM-DD");
    setTimeout(() => {
      this.isLoading = false;
    }, 100);

    this.getPermissionTypes();
    this.getLeaveTypes();
    this.LoadDataEmployeeCharts();
    this.getDataWorkingHours();
    this.loadHolidays();
    this.getEmployeeDayDuty();

  }

  showModal(type: string) {
    this.showPermissonFilter = false;
    this.showLeaveFilter = false;

    this.modal.template = this.filterContent;
    this.modal.toggleShow();
    if(type=="permission"){
      this.showPermissonFilter = true;
    }
    else if(type=="leave"){
      this.showLeaveFilter = true;
    }
  }

  toggleFilter() {
    this.enabledFilter = !this.enabledFilter;
  }

  getPermissionTypes(): void {
    this.dashboardService.getPermissionTypes().subscribe((res: any) => {
      this.permissionTypes = res;
      this.filter.partialPermissionTypeId = res[0].id;
      this.getEmployeePermissionBalance();
    });
  }

  getLeaveTypes(): void {
    this.dashboardService.getLeaveTypes().subscribe((res: any) => {
      this.leaveTypes = res;
      this.filter.leaveTypeId = res[0].id;
      this.getEmployeeLeaveBalance();
    });
  }

  loadHolidays() {
    this.subHolidays = this.dashboardService.getHolidays(this.holidayFilter, this.opt).subscribe((res: any) => {
      this.holidayList = res.list;
      console.log("holiday List => ", this.holidayList);
      // if(res.count > 0){
      //   this.holidayDates = this.initTimelineChart(this.holidayList);
      // }
      // else{

      // }      
    });
  }

  returnWorkingHours(result): barChartData[]{
    let finalRes:barChartData[] = [];
    let excptText = this.localize.translate.instant('Data.expectedWorkingHours');
    for(var i=0; i<result[0].length; i++){
      let labels = result[0];
      let actuals = result[1];
      let expecteds = result[2];
      if( actuals[i] !== 0 || expecteds[i] !== 0){
        let finalResItem:barChartData = new barChartData();
        finalResItem.x = labels[i];
        finalResItem.y = actuals[i];
        let exceed = actuals[i] >= expecteds[i];
        finalResItem.goals = [{
          name: excptText,
          value:expecteds[i],
          strokeWidth: exceed ? 15 : 8,
          strokeHeight: exceed ? 0 : 15,
          strokeColor: '#775DD0',
          strokeLineCap: exceed ? 'round' : ''
        }];
        finalRes.push(finalResItem);
      }     
    }
    return finalRes;    
  }

  initChart(value) {
    return {
      series: value.val,
      chart: {
        type: value.type,
        height: '500px',
        events: {
          legendClick: (chartContext, seriesIndex, config) => {
            this.chartOnClick(value.title, seriesIndex);
          },
        }
      } as ApexChart,
      legend: {
        show: true,
        position: 'bottom',
      } as ApexLegend,
      labels: value.labels,
      colors: value.color,
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: { show: true, label: value.totalLabel },
              value: { show: true },
            },
          },
        },
      } as ApexPlotOptions,
    };
  }

  initBarChart(result) {
    return {
      series: [
        {
          name: this.localize.translate.instant('Data.ActualWorkingHours'),
          data: this.returnWorkingHours(result)         
        }
      ],
      chart: {
        height: 350,
        type: 'bar'
      } as ApexChart,
      legend: {
        show: true,
        showForSingleSeries: true,
        customLegendItems: [this.localize.translate.instant('Data.expectedWorkingHours'),this.localize.translate.instant('Data.ActualWorkingHours')],
        markers: {
          fillColors: ['#775DD0','#00E396']
        }
      } as ApexLegend,
      colors: ['#00E396'],
      dataLabels: {
        formatter: (val, opt) => {
          let goals = opt.w.config.series[opt.seriesIndex].data[opt.dataPointIndex].goals;
          if (goals && goals.length) {
            return `${val} / ${goals[0].value} hrs`
          }
          return val
        }
      },
      yaxis: {
        reversed: !this.localize.isEnglish()
        //opposite:true
      } as ApexYAxis,
      plotOptions: {
        bar: {
          horizontal: true,
        }
      } as ApexPlotOptions,
    //   locales: [
    //   {
    //     name: "ar",
    //     options: {
    //     months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    //       shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    //       days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    //       shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    //       toolbar: {
    //           exportToSVG: "Download SVG22",
    //           exportToPNG: "Download PNG22",
    //           menu: "Menu22",
    //           selection: "Selection22",
    //           selectionZoom: "Selection Zoom22",
    //           zoomIn: "Zoom In22",
    //           zoomOut: "Zoom Out22",
    //           pan: "Panning22",
    //           reset: "Reset Zoom22"
    //       }
    //     }
    //   }
    // ] as ApexLocale,
    //   defaultLocale: "ar"
    };
  }





  LoadDataEmployeeCharts(): void {
    this.dashboardService.getEmployeeAttendance().subscribe((res: any) => {
      this.initializeEmployeeAttendanceChart(res);
      this.employeeAttendanceShow = true;
    },error=>{
      this.employeeAttendanceShow = false;
    });

    this.dashboardService.getLateRegulations().subscribe((res: any) => {
      this.initializeEmployeeLateDonughtChart(res);
      this.employeeLateShow = true;
    },
    error=>{
      this.employeeLateShow = false;
    });
  }

  getEmployeeDayDuty(){
    this.subEmployeeDuties = this.dashboardService.getEmployeeDuties().subscribe((res: any) => {
      this.duty = res;
      this.duty.dutyStartTime = this.duty.dutyStartTime == null ? null : this.duty.dutyStartTime.slice(0, -3);
      this.duty.dutyEndTime = this.duty.dutyEndTime == null ? null : this.duty.dutyEndTime.slice(0, -3);
      this.duty.logInTime = this.duty.logInTime != null ? this.duty.logInTime.substring(0, 5) : null;
      this.duty.logOutTime = this.duty.logOutTime != null ? this.duty.logOutTime.substring(0, 5) : null;
    });
  }

  initializeEmployeeAttendanceChart(data: any): void {
    const result = this.getKeysAndValues(data);
    this.employeeAttendanceValues = result[1];
    this.employeeAttendancelabels = [
      this.localize.translate.instant('Data.Attendace'),
      this.localize.translate.instant('Data.Weekend'),
      this.localize.translate.instant('Data.RestDay'),
      this.localize.translate.instant('Data.Holiday'),
      this.localize.translate.instant('Data.Absence')
    ];

    this.employeeAttendanceColors = ["#1dd317", "#e317c1", "#1759d3", "#3a087d", "#df0808"];
    this.attendance = this.drawChart(this.employeeAttendanceValues,this.employeeAttendancelabels,this.employeeAttendanceColors,"attendance",this.localize.translate.instant('Data.days'));
  }

  initializeEmployeeLateDonughtChart(data: any): void {    
    const result = this.getKeysAndValues(data);
    const arr = [];
    arr.push(result[1][2]);
    arr.push(result[1][3]);
    arr.push(result[1][4]);
    this.employeeLatelabels = [
      this.localize.translate.instant('Data.LateIn'),
      this.localize.translate.instant('Data.EarlyOut'),
      this.localize.translate.instant('Data.GoingOutDuringDuty')
    ];
    this.employeeLateColors = ['#deb887', '#ffa500', '#adff2f'];
    this.employeeLateValues = arr;
    this.employeeLateShow = true;
    this.lates = this.drawChart(this.employeeLateValues,this.employeeLatelabels,this.employeeLateColors,"late",this.localize.translate.instant('Data.Miute'));
  }

  getEmployeePermissionBalance(){
    this.employeePermissionShow = false;
    if(this.filter.partialPermissionTypeId == undefined || this.filter.partialPermissionTypeId == null) {
      return false;
    }
     this.dashboardService.getEmployeePermissions(this.filter.partialPermissionTypeId).subscribe((res: any) => {
      this.initializePermissionPieChart(res);
      this.employeePermissionShow = true;

    },
    error=>{
      this.employeePermissionShow = false;
    });
  }

  initializePermissionPieChart(data: any): void {
    const result = this.getKeysAndValues(data);
    this.employeePermissionValues = [result[1][1], result[1][2], result[1][3]];
    this.employeePermissionlabels = [
      this.localize.translate.instant('Charts.'+ result[0][1]),
      this.localize.translate.instant('Charts.'+ result[0][2]),
      this.localize.translate.instant('Charts.'+ result[0][3])
    ];
    this.employeePermissionColors = ["#df0808", "#e6ae07","#1dd317"];
    this.permissions = this.drawChart(this.employeePermissionValues,this.employeePermissionlabels,this.employeePermissionColors,"permission",this.localize.translate.instant('Data.Miute'));
  }
  getEmployeeLeaveBalance(){
    this.employeeLeaveShow = false;
    if(this.filter.leaveTypeId == undefined || this.filter.leaveTypeId == null) {
      return false;
    }
    this.dashboardService.getEmployeeLeaves(this.filter.leaveTypeId).subscribe((res: any) => {
      this.initializeLeavePieChart(res);
      this.employeeLeaveShow = true;
    },
    error=>{
      this.employeeLeaveShow = false;
    });
  }
  initializeLeavePieChart(data: any): void {
    const result = this.getKeysAndValues(data); 
    this.employeeLeaveValues = [result[1][1], result[1][2]];
    this.employeeLeavelabels = [
      this.localize.translate.instant('Charts.'+ result[0][1]),
      this.localize.translate.instant('Charts.'+ result[0][2])
    ];
    this.employeeLeaveColors = ["#df0808", "#1dd317"];
    this.employeeLeaveShow = true;
    this.leaves = this.drawChart(this.employeeLeaveValues,this.employeeLeavelabels,this.employeeLeaveColors,"leave",this.localize.translate.instant('Data.Days'));
  }
  drawChart(values: any[],labels: any[],colors: any[],chartTitle:string, totalLabel?:string): any{
   return this.initChart({
    val: values,
    color: colors,
    type: 'donut',
    labels: labels,
    totalLabel: totalLabel,
    title: chartTitle
  });
  }
  getKeysAndValues(data): [any[], any[]] {
    if (data !== null && data !== undefined) {
      const keys = Object.keys(data).map((key) => (key));
      const values = Object.keys(data).map((key) => data[key]);
      return [keys, values];
    }

  }



  // initTimelineChart(result) {
  //   return {
  //     series: [
  //       {
  //         data: 
  //         this.returnHolidays(result),
  //       }
  //     ],
  //     chart: {
  //       height: 350,
  //       type: 'rangeBar'
  //     } as ApexChart,
  //     dataLabels: {
  //       enabled: true,
  //       formatter: (val, opts) => {
  //         var label = opts.w.globals.labels[opts.dataPointIndex];
  //         var a = moment(val[0]);
  //         var b = moment(val[1]);
  //         var diff = b.diff(a, 'days');
  //         return label + ': ' + diff + (diff > 1 ? ' days' : ' day')
  //       },
  //       style: {
  //         colors: ['#f3f4f5', '#fff']
  //       }
  //     },
  //     plotOptions: {
  //       bar: {
  //         horizontal: true,
  //         distributed: true,
  //         dataLabels: {
  //           hideOverflowingLabels: false
  //         }
  //       }
  //     } as ApexPlotOptions,
  //     xaxis: {
  //       type: 'datetime'
  //     },
  //     yaxis: {
  //       show: false
  //     },
  //     grid: {
  //       row: {
  //         colors: ['#f3f4f5', '#fff'],
  //         opacity: 1
  //       }
  //     }
  //   };
  // }
  // returnHolidays(result: any): TimeLineChartData[]{
  //   let finalRes:TimeLineChartData[] = [];
  //   let fillColors = ['#008FFB','#775DD0', '#FEB019', '#FF4560'];
  //   for(var i=0; i<result.length; i++){
  //     let item = result[i];
  //     let finalResItem:TimeLineChartData = new TimeLineChartData();
  //     finalResItem.x = item.publicHolidayNameFl;
  //     finalResItem.fillColor = fillColors[i];
  //     console.log("St Date", new Date(item.startDate));      
  //     finalResItem.y = [ new Date(item.startDate).getTime() , new Date(item.endDate).getTime()];
  //     finalRes.push(finalResItem);  
  //   }
  //   console.log("finalRes are : ", finalRes);  
  //   return finalRes;    
  // }





  ChangeWeek(type) {
    let newDate = new Date(this.dayDate + " 00:00:00");
    if (type == '-') {
      newDate.setDate(newDate.getDate() - 7);
      this.dayDate = moment(newDate).format("YYYY-MM-DD");
    } 
    else {
      newDate.setDate(newDate.getDate() + 7);
      this.dayDate = moment(newDate).format("YYYY-MM-DD");
    }
    if (this.dayDate == moment(this.currentDate).format("YYYY-MM-DD")){
      this.isCurrentDate = true;
    }
    else this.isCurrentDate = false;
    this.sumWorkingHour = 0;
    this.sumExpectedWorkingHour = 0;
    let fixDate = new Date(this.dayDate);
    fixDate.setDate(fixDate.getDate() - 6);
    this.oldDate = moment(fixDate).format("YYYY-MM-DD");
    this.getDataWorkingHours();
  }
  getDataWorkingHours(){
      this.subWorkingHours = this.dashboardService.getWorkingHours(this.dayDate).subscribe((res: any) => {
        console.log("before working hours is", res);
        this.initializeWorkingHoursChart(res);
       });
  } 
  
  initializeWorkingHoursChart(data: any): void {
    const result = this.getKeysAndValues2(data);
    console.log("after working hours is", result);
    this.workingHours = this.initBarChart(result);
    result[1].forEach((currentValue, index) => {
      this.sumWorkingHour = this.sumWorkingHour + currentValue
    });
    result[2].forEach((currentValue, index) => {
      this.sumExpectedWorkingHour = this.sumExpectedWorkingHour + currentValue
    });
    this.sumWorkingHour = Math.round(this.sumWorkingHour * 100) / 100;
    this.sumExpectedWorkingHour = Math.round(this.sumExpectedWorkingHour * 100) / 100;
  }

  getKeysAndValues2(data): [any[], any[], any[]] {
    if (data !== null && data !== undefined) {
      // const keys = Object.keys(data).map((key) => (data[key].dayDate));
      const keys = Object.keys(data).map((key) =>
        (moment(data[key].dayDate).format("DD/MM") + " \n " + moment(data[key].dayDate).clone().locale(this.localize.isEnglish() ? 'en' : 'ar').format("ddd")));
      const values = Object.keys(data).map((key) => this.getTimeFromMins(data[key].workingHours));
      const actaualhours = Object.keys(data).map((key) => this.getTimeFromMins(data[key].expectedWork));
      return [keys, values, actaualhours];
    }
  }

  getTimeFromMins(mins) {
    if (mins >= 24 * 60 || mins < 0) {
      throw new RangeError("Valid input should be greater than or equal to 0 and less than 1440.");
    }
    var h = mins / 60 | 0,
      m = mins % 60 | 0;
      var min=m  /60;
    return h + (Math.round(min * 100) / 100);
  }


  goToHolidays(currentRoute){
    this.router.navigateByUrl(currentRoute);
  }
  chartOnClick(chartTitle: any, seriesIndex: number) {
    if(chartTitle == "attendance"){
      const currentRoute = this.attendanceLabelUrl[seriesIndex];
      this.router.navigateByUrl(currentRoute);
    }
    else if(chartTitle == "late"){
      const currentRoute = this.lateLabelUrl[seriesIndex];
      this.router.navigateByUrl(currentRoute);
    }
    else if(chartTitle == "permission"){  
      this.router.navigateByUrl(`home/inquiry/part-day-list/list?filterName="permission"&filterId=${this.filter.partialPermissionTypeId}`);
    }
    else if(chartTitle == "leave"){
      this.router.navigateByUrl("home/inquiry/leavs-balance-list/list");
    }
  }
}


export class barChartData{
  x: string;
  y: number;
  goals: barChartGoalsData[];
}

export class barChartGoalsData{
  name?: string;
  value: number;
  strokeWidth?: number = 5;
  strokeHeight?: number = 10;
  strokeLineCap?: string;
  strokeColor?: string = '#775DD0';
}

export class TimeLineChartData{
  x: string;
  y: number[];
  fillColor: string;
}



