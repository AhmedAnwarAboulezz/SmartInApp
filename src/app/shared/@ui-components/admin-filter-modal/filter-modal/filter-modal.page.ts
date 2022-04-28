import { ModalController, NavParams } from '@ionic/angular';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Filter } from '../models/filter';
import { FilterService } from '../services/filter.service';
import { DisplayProperty } from '../models/displayProperty';
import { IonicSelectableComponent } from 'ionic-selectable';
import { Subject, Subscription } from 'rxjs';
import { DropDown } from '../models/dropdown';
import { resetCalenderObj } from '../models/resetCalender';
import * as moment from 'moment';
import { IonicStorageService } from 'src/app/core/services/storage/ionicStorageService.service';
import { TranslationService } from 'src/app/core/services/localization/translation.service';


@Component({
  selector: 'app-admin-modal',
  templateUrl: './filter-modal.page.html',
  styleUrls: ['./filter-modal.page.scss'],
})
export class FilterModalPage implements OnInit {
  // resetCalenderStart: Subject<resetCalenderObj> = new Subject<resetCalenderObj>();
  // resetCalenderEnd: Subject<resetCalenderObj> = new Subject<resetCalenderObj>();


  @Input() display: DisplayProperty;
  filter: Filter = {};
  statusList: any[];
  typeList: any[];
  dropdownEnabled = true;
  values: number[];

  buttonClasses = [
    'btn-outline-primary',
    'btn-outline-secondary',
    'btn-outline-success',
    'btn-outline-danger',
    'btn-outline-warning',
    'btn-outline-info',
    'btn-outline-light',
    'btn-outline-dark'
  ];
  buttonClass = this.buttonClasses[0];
  titleText: string = "";
  employeeSearchText: string = "";
  items3: DropDown[] = [];
  //filterItems: any[];
  selectedItems: any[] = [];
  displayOk: any = false;
  departments: DropDown[] = [];
  employeesSubscription: Subscription;
  employees: any[] = [];
  employee: any;
  maxData : any = (new Date()).getFullYear() + 3;
  constructor(
    private modalCtrl: ModalController,
    private filterService: FilterService,
    public storageService: IonicStorageService,
    public localize: TranslationService,
    public navParams: NavParams) {
    this.filter = this.navParams.get('filter');
    
    //this.FilterItems();
    // if(this.filter.administrativeLevels!= null){
    //   this.selectedItems = this.filter.administrativeLevels;
    // }
    this.setEmployeeOldSearch3();


  }

  ngOnInit() {
    this.loadLookup();
    //this.loadTree();
    this.loadDepartments();
    if (this.display.dayDate && this.filter.dayDate === undefined) { this.filter.dayDate = new Date().toDateString(); }
    if (this.display.startDate && this.filter.startDate === undefined) { this.filter.startDate = new Date().toDateString(); }
    if (this.display.endDate && this.filter.endDate === undefined) { this.filter.endDate = new Date().toDateString(); }
    if (this.display.monthYear && this.filter.monthYear === undefined) { this.filter.monthYear = new Date().toDateString(); }
  }

  
  // close() {
  //   //const test: Filter = {};
  //   // this.resetFilter();
  //   // this.apply();
  //   this.modalCtrl.dismiss({});
  // }
  // apply() {
  //   this.modalCtrl.dismiss({ dismissed: true, filter: this.filter });
  // }
  // resetFilter(): void {
  //   this.employee = null;
  //   this.employees = [];
  //   this.departments = [];
  //   this.filter =  { startDate: new Date().toDateString(), endDate: new Date().toDateString(), dayDate: new Date().toDateString() };
  // }

  apply() {
    const formData = { dismissed: true, filter: this.filter };
    this.modalCtrl.dismiss(formData);
  }
  resetFilter() {
    this.employee = null;
    this.employees = [];
    this.departments = [];
    let start = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    let end = new Date();
    this.filter = { startDate: end.toLocaleDateString('en-US'), endDate: end.toLocaleDateString('en-US'), dayDate:end.toLocaleDateString('en-US')};
    this.apply();
  }

  close(){
    const formData = {};
    this.modalCtrl.dismiss(formData);
  }
  loadLookup(): void {
    this.filterService.getLookup().subscribe((res: any) => {
      this.statusList = res[0];      
      //res[1].forEach(item => this.items.push(new TreeviewItem(item)));
    });
    if(this.display.leave){
      this.filterService.getLeaveRegulations().subscribe((res: any) => {
        this.typeList = res;
      });
    }
    else if(this.display.partPermission){
      this.filterService.getPartPermissions().subscribe((res: any) => {
        this.typeList = res;
      });
    }
    else if(this.display.fullPermission){
      this.filterService.getFullPermissions().subscribe((res: any) => {
        this.typeList = res;
      });
    }
    else if(this.display.allowance){
      this.filterService.getAllowances().subscribe((res: any) => {
        this.typeList = res;
      });
    }
    
  }
 

  setDepartmentOldSearch(){
    if(this.filter.administrativeLevels!= null){
      this.departments = this.items3.filter(a=>this.filter.administrativeLevels.includes(a.id.toString()));
    }
  }
  setEmployeeOldSearch(getPagenationOptions: any): any{
    if(this.filter.employeeId!= null){
      getPagenationOptions.employeeId = this.filter.employeeId;
      this.employee = this.employees.find(a=>this.filter.employeeId.includes(a.id.toString()));
    }
    return getPagenationOptions;
  }
  setEmployeeOldSearch2(){
    if(this.filter.employeeId!= null){
      this.employee = this.employees.find(a=>this.filter.employeeId.includes(a.id.toString()));
    }
  }
  setEmployeeOldSearch3(){
    if(this.filter.employeeId!= null)
    {
      let getPagenationOptions: any = {
        limit: 10,
        offset: 1,
        value: '',
        colName: '',
        contain: true,
        isNew: false,
        includeIncompleteEmployees: true,
        inServiceEmployees: true,
        employeeId:  this.filter.employeeId,
        firstCall: true
      };
      this.employeesSubscription = this.filterService.getEmployees(getPagenationOptions).subscribe(employees => {
        if (this.employeesSubscription.closed) {
          return;
        }
        this.employees = employees.list;
        this.employee = this.employees.find(a=>this.filter.employeeId == a.id.toString());
      });
    }
  }
  
  async loadDepartments(){
    let res: DropDown[] =  await this.storageService.getObject('TheDepartments');
    if (res !== null) {
      this.items3 = res;
      this.setDepartmentOldSearch();
      //this.filterItems = this.items3;
    } 
    else {
      this.filterService.getDepartments().subscribe(res => {
        this.storageService.removeItem('TheDepartments');
        if(res !== null){
          this.storageService.setObject('TheDepartments', res);
          this.items3 = res;
          this.setDepartmentOldSearch();
          //this.filterItems = this.items3;
        }
      });
    }
  }
//   onFilterChange(value: any) {
//     alert(value);
//     this.filter.administrativeLevels = value;
//   }

// FilterItems(searchText:any) {
//   this.filterItems = this.items3;
//   const searchTerm = searchText.srcElement.value;
//   if (!searchTerm) {
//     return;
//   }  
//   if (searchTerm !== '') {
//     this.filterItems = this.filterItems.filter((item) => {
//       return (item.nameFl.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
//     });
//   }
// }

// CheckChange(item: any) {
//   for (let index = 0; index < this.filterItems.length; index++) {
//      const element = this.filterItems[index];
//     if (element.id == item.id) {
//       this.filterItems[index].isSelected = !this.filterItems[index].isSelected;
//     }
//   }
//   this.selectedItems = this.filterItems.filter(a=>a.isSelected == true).map(r=>r.id);
//   this.filter.administrativeLevels =  this.selectedItems;
// }


departmentChange(event: {
    component: IonicSelectableComponent,
    value: any
   }) 
  {
    console.log('department:', event.value);
    this.filter.administrativeLevels = this.departments.map(r=>r.id.toString());
  }

  employeeChange(event: {
    component: IonicSelectableComponent,
    value: any
   }) 
  {
    
    console.log('employee:', event.value);
    if(this.employee !== null){
      this.filter.employeeId = this.employee.id.toString();
    }
    else{
      this.filter.employeeId = null;
    }
    
  }
  // filteremployees(employees: DropDown[], text: string) {
  //   return employees.filter(port => {
  //     return port.nameFl.toLowerCase().indexOf(text) !== -1 ||
  //       //port.nameSl.toLowerCase().indexOf(text) !== -1 ||
  //       port.id.toString().toLowerCase().indexOf(text) !== -1;
  //   });
  // }

  async searchemployees(event: {
    component: IonicSelectableComponent,
    text: string
  }) {
    let text = event.text.trim().toLowerCase();
    // if (text && text != ""){
    //   await this.delay(1100);
    // }
    event.component.startSearch();

    // Close any running subscription.
    if (this.employeesSubscription) {
      this.employeesSubscription.unsubscribe();
    }

    // if (!text && this.employee == null) {
    //   // Close any running subscription.
    //   if (this.employeesSubscription) {
    //     this.employeesSubscription.unsubscribe();
    //   }

    //   event.component.items = [];
    //   event.component.endSearch();
    //   //return;
    // }
    this.setEmployeeOldSearch2();
    let getPagenationOptions: any = {
      limit: 10,
      offset: 1,
      value: text,
      colName: '',
      contain: true,
      isNew: false,
      includeIncompleteEmployees: true,
      inServiceEmployees: true,
      employeeId:  (this.employee != null ? this.employee.id : null),
      firstCall: true
    };
    this.employeesSubscription = this.filterService.getEmployees(getPagenationOptions).subscribe(employees => {
      // Subscription will be closed when unsubscribed manually.
      if (this.employeesSubscription.closed) {
        return;
      }
      this.employees = employees.list;
      event.component.items = employees.list;      
      event.component.endSearch();
    });
  }

  



  delay(ms: number) {
    return new Promise( resolve => {
      //this.loader.show();
      setTimeout(resolve, ms);
      //this.loader.hide();    
    } );
  }


  ionViewWillEnter(){
  }


  // toggleAllSelection(selected) {
  //   if (selected) {
  //     this.filter.statusIdList = [...this.statusList.map(item => item.id), '0'];
  //   } 
  //   else {
  //     this.filter.statusIdList = []; 
  //   }
  // }
  // toggleUnSelectAll(selected)
  // {
  //     var selectedItems= this.filter.statusIdList.filter(e => e != '0');
  //     this.filter.statusIdList = selectedItems;
  // }

}




