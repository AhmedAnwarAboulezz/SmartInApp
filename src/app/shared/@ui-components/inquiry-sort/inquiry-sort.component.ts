import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-inquiry-sort',
  templateUrl: './inquiry-sort.component.html',
  styleUrls: ['./inquiry-sort.component.scss'],
})
export class InquirySortComponent implements OnInit {

  data: any = {
    column: ' startDate',
    direction: 'ascending',
    sortTypeId: 0
  };
  @Input() ascSortType = false;

  @Output() sortData = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {}


  changeSort(){
    

    if(this.ascSortType )
      this.data.direction = 'ascending';
    else 
      this.data.direction = 'descending';

      this.data.ascSortType = !this.ascSortType;
       this.sortData.emit(this.data);

  }
}
