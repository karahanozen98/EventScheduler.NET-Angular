import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort, Sort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { IBaseResponse } from '../../shared/models/base.response.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrl: './table.component.scss',
    standalone: true,
    imports: [
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatButtonModule,
        MatIconModule,
    ],
})
export class TableComponent implements OnInit {
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatTable) table!: MatTable<ISchedulerItem>;
    dataSource = new MatTableDataSource<ISchedulerItem>();
    displayedColumns = ['startDate', 'title', 'description', 'actions'];
    scheduledEvents: ISchedulerItem[] = [];

    constructor(
        private http: HttpClient,
        private router: Router,
        private datePipe: DatePipe
    ) {}

    ngOnInit(): void {
        this.fetchCalendarEvents();
    }

    handleCreateNewEvent(): void {
        this.router.navigate(['new-event']);
    }

    formatDate(date: Date) {
        return this.datePipe.transform(date, 'YYYY-MM-dd HH:mm');
    }

    editRow(row: ISchedulerItem) {}

    deleteRow(row: ISchedulerItem) {
        this.http
            .delete<IBaseResponse<unknown>>(`api/v1/CalendarEvent/${row.id}`)
            .subscribe((res) => {
                if (res.isSuccess) {
                    this.fetchCalendarEvents();
                }
            });
    }

    fetchCalendarEvents(): void {
        this.http
            .get<IBaseResponse<ISchedulerItem[]>>('api/v1/CalendarEvent')
            .pipe(map((res) => res.result))
            .subscribe((data) => {
                this.dataSource.data = data;
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
            });
    }
}

export interface ISchedulerItem {
    id: string;
    title: string;
    description: string;
    startDate: Date;
}
