import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Column } from '../column';
import { Row } from '../row';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent<T> implements OnInit {
  @Input() columns: Column<T>[];
  @Input() rows: Row<T>[];

  dataSource = new MatTableDataSource<Row<T>>();
  public columnNames: string[];

  constructor() {}

  ngOnInit(): void {
    this.dataSource.data = this.rows;
    console.log(this.rows);
    console.log(this.dataSource);
    this.columnNames = this.columns.map(column => column.name.toString());
  }
}
