import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { TableDataSource } from './table-datasource';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IBaseResponse } from '../../shared/models/base.response.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

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
export class TableComponent implements AfterViewInit {
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatTable) table!: MatTable<ISchedulerItem>;
    dataSource = new TableDataSource();
    displayedColumns = ['date', 'title', 'description'];

    constructor(private http: HttpClient, private router: Router) {}

    handleCreateNewEvent(): void {
        this.router.navigate(['new-event']);
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.fetchData().subscribe((data) => {
            this.table.dataSource = data;
        });
    }

    fetchData(): Observable<ISchedulerItem[]> {
        return this.http
            .get<IBaseResponse<ISchedulerItem[]>>('api/v1/CalendarEvent')
            .pipe(map((res) => res.result));
    }
}

interface ISchedulerItem {
    id: string;
    title: string;
    description: string;
    date: Date;
}
