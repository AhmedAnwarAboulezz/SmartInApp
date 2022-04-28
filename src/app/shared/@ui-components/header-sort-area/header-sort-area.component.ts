import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslationService } from 'src/app/core/services/localization/translation.service';
import { HeaderFilterType } from '../../Enums/Enums';

@Component({
  selector: 'app-header-sort-area',
  templateUrl: './header-sort-area.component.html',
  styleUrls: ['./header-sort-area.component.scss'],
})
export class HeaderSortAreaComponent implements OnInit {

  @Input() currentCount = 0;
  @Input() totalCount = 0;
  @Input() useSort = true;
  @Input() ascSortType = false;
  @Input() fromDate: any;
  @Input() toDate: any;
  @Input() dayDate: any;
  @Input() year: number;
  @Input() type: HeaderFilterType = 2
  @Output() sort: EventEmitter<any> = new EventEmitter<any>();
  @Output() filter: EventEmitter<any> = new EventEmitter<any>();

  @Input() isAdmin = false;
  @Input() sortTypeId = 0;
  @Input() Typesort = 0;
  @Input() fieldNames = ['startDate', 'startDate','employeeId'];

  constructor(public localize: TranslationService) { }

  ngOnInit() {
    if(this.dayDate == undefined || this.dayDate == null) this.dayDate = new Date();
    if(this.fromDate == undefined || this.fromDate == null) this.fromDate = new Date();
    if(this.toDate == undefined || this.toDate == null) this.toDate = new Date();
    if(this.year == undefined || this.year == null) this.year = new Date().getFullYear();
  }

  // sortData(event){
  //   this.sort.emit(event);
  // }
  showFilterModal(){
    this.filter.emit();
  }


  
  sortData(data){
    if (data !== null && data !== undefined) {
      this.ascSortType = data.ascSortType;
    }
    this.sort.emit(data);
  }
  sortDataAdmin(data){
    console.log("anwar sort", data);
    
    this.sort.emit(data);
  }
}
