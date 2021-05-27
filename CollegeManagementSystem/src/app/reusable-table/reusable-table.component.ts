import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-reusable-table',
  templateUrl: './reusable-table.component.html',
  styleUrls: ['./reusable-table.component.scss']
})
export class ReusableTableComponent implements OnInit {
  @Input() gridData: any[];
  @Input() colData: any[];
  @Output() onRowSelection: EventEmitter<any> = new EventEmitter();
  @Output() onRowDeletion: EventEmitter<any> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  onRowClick(record: any) {
    this.onRowSelection.emit(record);
  }
  onRowDelete(record: any) {
    this.onRowDeletion.emit(record);
  }
}
