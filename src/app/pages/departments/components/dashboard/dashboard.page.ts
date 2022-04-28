import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApexChart, ApexLegend, ApexPlotOptions } from 'ng-apexcharts';
import { TranslationService } from 'src/app/core/services/localization/translation.service';
import { AdminDashboardService } from './services/admin-dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss'],
})

export class DashboardPage implements OnInit {
  attendance:any;
  lates:any;
  allowance:any;
  fulldays:any;
  partdays:any;
  leaves:any;

  isLoading = true;

  allowancelabels = [];
  allowanceValues = [];
  allowanceColors = [];
  allowancesCount = 0;
  allowanceShow = false;

  attendancelabels = [];
  attendanceValues = [];
  attendanceColors = [];
  attendanceCount = 0;
  attendanceShow = false;

  lateslabels = [];
  latesValues = [];
  latesColors = [];
  latesCount = 0;
  latesShow = false;

  fulldayPermissionlabels = [];
  fulldayPermissionValues = [];
  fulldayPermissionColors = [];
  fulldayPermissionCount = 0;
  fulldayPermissionShow = false;

  partdayPermissionlabels = [];
  partdayPermissionValues = [];
  partdayPermissionColors = [];
  partdayPermissionCount = 0;
  partdayPermissionShow = false;

  leaveslabels = [];
  leavesValues = [];
  leavesColors = [];
  leavesCount = 0;
  leavesShow = false;

  attendanceLabelUrl = [
    'home/departments/attendance-list/list?filterName="absence"&filterId={11}',
    'home/departments/attendance-list/list?filterName="attendance"&filterId={1,18}',
    'home/departments/attendance-list/list?filterName="noSign"&filterId={2,3}',
    'home/departments/attendance-list/list?filterName="noSign"&filterId={6,8,9,10,13,14,17}',
  ];

  constructor(
    public localize: TranslationService,
    public dashboardService: AdminDashboardService,
    private router: Router

  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.attendance = this.initChart({
      val: [0],
      color: ['#62CD68'],
      type: 'donut',
      labels: [this.localize.translate.instant('Data.Attendance')],
      totalLabel: this.localize.translate.instant('Data.employees'),
    });
    this.lates = this.initChart({
      val: [0],
      color: ['#62CD68'],
      type: 'donut',
      labels: [this.localize.translate.instant('Data.Lates')],
      totalLabel: this.localize.translate.instant('Data.Minutes'),
    });
    this.allowance = this.initChart({
      val: [0],
      color: ['#62CD68'],
      type: 'donut',
      labels: [this.localize.translate.instant('Data.Allowances')],
      totalLabel: this.localize.translate.instant('Data.employees'),
    });
    this.fulldays = this.initChart({
      val: [0],
      color: ['#62CD68'],
      type: 'donut',
      labels: [this.localize.translate.instant('Data.FullDayPermission')],
      totalLabel: this.localize.translate.instant('Data.employees'),
    });
    this.partdays = this.initChart({
      val: [0],
      color: ['#62CD68'],
      type: 'donut',
      labels: [this.localize.translate.instant('Data.PartDayPermission')],
      totalLabel: this.localize.translate.instant('Data.employees'),
    });
    this.leaves = this.initChart({
      val: [0],
      color: ['#62CD68'],
      type: 'donut',
      labels: [this.localize.translate.instant('Data.Leaves')],
      totalLabel: this.localize.translate.instant('Data.employees'),
    });
    setTimeout(() => {
      this.isLoading = false;
    }, 100);

    this.LoadDataEmployeeCharts();

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


  LoadDataEmployeeCharts(): void {
    // this.dashboardService.getEmployeeAttendance().subscribe((res: any) => {
    //   this.initializeEmployeeAttendanceChart(res);
    //   this.employeeAttendanceShow = true;
    // },error=>{
    //   this.employeeAttendanceShow = false;
    // });

    // this.dashboardService.getLateRegulations().subscribe((res: any) => {
    //   this.initializeEmployeeLateDonughtChart(res);
    //   this.employeeLateShow = true;
    // },
    // error=>{
    //   this.employeeLateShow = false;
    // });


     this.dashboardService.getCombinedManagerData().subscribe((res: any) => {
      console.log('combined data', res);
      this.initializeManagerAttendanceChart(res.mobileDashboardCount.attendanceAbsenceCount);
      this.initializeManagerLatesChart(res.mobileDashboardCount.latesCount);
      if(res.allowancesCount && res?.allowancesCount?.values?.length !== 0) this.initializeManagerAllowanceChart(res.allowancesCount);
      if(res.fullPermissionsCount && res?.fullPermissionsCount?.values?.length !== 0) this.initializeManagerFullDayPermissionChart(res.fullPermissionsCount);
      if(res.permissionsCount && res?.permissionsCount?.values?.length !== 0) this.initializeManagerPartDayPermissionChart(res.permissionsCount);
      if(res.leavesCount && res?.leavesCount?.values?.length !== 0) this.initializeManagerLeavesChart(res.leavesCount);

    }, error => {

    });

  }


  initializeManagerAllowanceChart(data): void {
    this.allowancesCount = this.itemTotal(data.values);
    this.allowanceValues = data.values.map(item=> +item);
    this.allowancelabels = this.localize.isEnglish() ? data.namesFl : data.namesSl;
    this.allowanceColors = ['#ff1493', '#008000', '#a9a9a9', '	#ffd700', '#7fffd4', '#008080', '	#deb887'];
    if(this.allowancesCount > 0)
    {
      this.allowanceShow = true;
    }
    this.allowance = this.drawChart(this.allowanceValues,this.allowancelabels,this.allowanceColors,"allowance",this.localize.translate.instant('Data.employee'));

  }

  initializeManagerAttendanceChart(data): void {
    const result = this.getKeysAndValues(data);
    this.attendanceCount = result[1][0];
    this.attendanceValues = [result[1][2], result[1][1], result[1][3], result[1][4]];
    this.attendancelabels = [
      this.localize.translate.instant('Data.Absence'),
      this.localize.translate.instant('Data.Attendance'),
      this.localize.translate.instant('Data.Nosign'),
      this.localize.translate.instant('Data.Others')
    ];
    this.attendanceColors = ['#ff0000', '#008000', '#ffa500', '#ffff00'];
    this.attendanceShow = true;
    this.attendance = this.drawChart(this.attendanceValues,this.attendancelabels,this.attendanceColors,"attendance",this.localize.translate.instant('Data.employee'));
  }
  initializeManagerLatesChart(data): void {
    const result = this.getKeysAndValues(data);
    this.latesCount = result[1][0] + result[1][1] + result[1][2];

    this.latesValues = [result[1][0], result[1][1], result[1][2]];
    this.lateslabels = [
      this.localize.translate.instant('Data.LateIn'),
      this.localize.translate.instant('Data.EarlyOut'),
      this.localize.translate.instant('Data.GoingOutDuringDuty')
    ];
    this.latesColors = ['#deb887', '#87ceeb', '#0000ff'];
    this.latesShow = true;
    this.lates = this.drawChart(this.latesValues,this.lateslabels,this.latesColors,"late",this.localize.translate.instant('Data.employee'));

  }
  initializeManagerFullDayPermissionChart(data): void {
    this.fulldayPermissionCount = this.itemTotal(data.values);
    this.fulldayPermissionValues = data.values.map(item=> +item);
    this.fulldayPermissionlabels = this.localize.isEnglish() ? data.namesFl : data.namesSl;
    this.fulldayPermissionColors = ['#87ceeb', '#adff2f', '#ff0000', '#a52a2a', '#000080'];
    if(this.fulldayPermissionCount > 0)
    {
      this.fulldayPermissionShow = true;
    }
    this.fulldays = this.drawChart(this.fulldayPermissionValues,this.fulldayPermissionlabels,this.fulldayPermissionColors,"fullDay",this.localize.translate.instant('Data.employee'));

  }
  initializeManagerPartDayPermissionChart(data): void {
    this.partdayPermissionCount = this.itemTotal(data.values);
    this.partdayPermissionValues = data.values.map(item=> +item);
    this.partdayPermissionlabels = this.localize.isEnglish() ? data.namesFl : data.namesSl;
    this.partdayPermissionColors = ['#ee82ee', '#87ceeb', '#adff2f', '#ff0000', '#a52a2a', '#000080'];
    if(this.partdayPermissionCount > 0)
    {
      this.partdayPermissionShow = true;
    }
    this.partdays = this.drawChart(this.partdayPermissionValues,this.partdayPermissionlabels,this.partdayPermissionColors,"partDay",this.localize.translate.instant('Data.employee'));
  }
  initializeManagerLeavesChart(data): void {
    this.leavesCount = this.itemTotal(data.values);
    this.leavesValues = data.values.map(item=> +item);
    this.leaveslabels = this.localize.isEnglish() ? data.namesFl : data.namesSl;
    this.leavesColors = ['#a52a2a', '#000080', '#ee82ee', '#87ceeb', '#adff2f', '#ff0000'];
    if(this.leavesCount > 0)
    {
      this.leavesShow = true;
    }
    this.leaves = this.drawChart(this.leavesValues,this.leaveslabels,this.leavesColors,"leave",this.localize.translate.instant('Data.employee'));
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
  itemTotal(data: []) {
    let total = 0;
    if (data == null) {
      return 0;
    }
    for (let i = 0; i < data.length; i++) {
      if (data[i]) {
        total += Number(data[i]);
      }
    }
    return total;
  }

  chartOnClick(chartTitle: any, seriesIndex: number) {
    if(chartTitle == "attendance"){
      const currentRoute = this.attendanceLabelUrl[seriesIndex];
      this.router.navigateByUrl(currentRoute);
    }
    else if(chartTitle == "late"){
      this.router.navigateByUrl("home/departments/lates-list/list")
    }
    else if(chartTitle == "partDay"){  
      this.router.navigateByUrl("home/departments/part-day-list/list");
    }
    else if(chartTitle == "fullDay"){
      this.router.navigateByUrl("home/departments/full-day-list/list");
    }
    else if(chartTitle == "allowance"){
      this.router.navigateByUrl("home/departments/allowance-list/list");
    }
    else if(chartTitle == "leave"){
      this.router.navigateByUrl("home/departments/leavs-list/list");
    }
  }
}
