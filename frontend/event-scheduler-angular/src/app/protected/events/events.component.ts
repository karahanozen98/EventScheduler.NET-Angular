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
import { ICalendarEvent } from '../../shared/models/calendar-event.model';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
    selector: 'app-table',
    templateUrl: './events.component.html',
    styleUrl: './events.component.scss',
    standalone: true,
    imports: [
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatButtonModule,
        MatIconModule,
    ],
})
export class EventsComponent implements OnInit {
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatTable) table!: MatTable<ICalendarEvent>;
    dataSource = new MatTableDataSource<ICalendarEvent>();
    displayedColumns = ['startDate', 'title', 'description', 'actions'];
    scheduledEvents: ICalendarEvent[] = [];

    constructor(
        private http: HttpClient,
        private router: Router,
        private datePipe: DatePipe,
        private snackbarService: SnackbarService
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

    editRow(row: ICalendarEvent) {
        this.router.navigate([`event/${row.id}`]);
    }

    deleteRow(row: ICalendarEvent) {
        this.http
            .delete<IBaseResponse<unknown>>(`api/v1/CalendarEvent/${row.id}`)
            .subscribe((res) => {
                this.fetchCalendarEvents();
                this.snackbarService.sucess('Delete operation is successful');
            });
    }

    fetchCalendarEvents(): void {
        this.http
            .get<IBaseResponse<ICalendarEvent[]>>('api/v1/CalendarEvent')
            .pipe(map((res) => res.result))
            .subscribe((data) => {
                this.dataSource.data = data;
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
            });
    }
}
