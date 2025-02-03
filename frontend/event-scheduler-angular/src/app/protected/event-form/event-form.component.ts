import moment from 'moment';
import { Component, inject, OnInit } from '@angular/core';
import {
    ReactiveFormsModule,
    FormBuilder,
    Validators,
    AbstractControl,
    ValidationErrors,
    FormGroup,
    FormControl,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient } from '@angular/common/http';
import { IBaseResponse } from '../../shared/models/base.response.model';
import {
    isDateLessThanToday,
    isPastDateTime,
    mergeDateAndTime,
} from '../../shared/utils/date.utils';
import { ActivatedRoute } from '@angular/router';
import { ICalendarEvent } from '../../shared/models/calendar-event.model';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
    selector: 'app-new-event',
    templateUrl: './event-form.component.html',
    styleUrl: './event-form.component.scss',
    standalone: true,
    imports: [
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatRadioModule,
        MatCardModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatTimepickerModule,
        MatFormFieldModule,
    ],
})
export class EventFormComponent implements OnInit {
    private fb = inject(FormBuilder);
    private eventId: string = null;
    private isEditing = () => this.eventId != null;
    eventForm: FormGroup<{
        title: FormControl<string>;
        description: FormControl<string>;
        date: FormControl<moment.Moment>;
        time: FormControl<any>;
    }> = this.fb.group({
        title: ['', Validators.required],
        description: [''],
        date: [moment(), [(Validators.required, this.minDateValidator)]],
        time: [null, [Validators.required, this.minTimeValidator]],
    });

    constructor(
        private http: HttpClient,
        private route: ActivatedRoute,
        private snackBarService: SnackbarService
    ) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            this.eventId = params.get('id');
        });

        this.eventForm.get('date')!.valueChanges.subscribe(() => {
            setTimeout(() => {
                this.eventForm.get('time')!.updateValueAndValidity();
            });
        });

        if (this.eventId) {
            this.http
                .get<IBaseResponse<ICalendarEvent>>(
                    `api/v1/CalendarEvent/${this.eventId}`
                )
                .subscribe((res) => {
                    this.eventForm.patchValue({
                        title: res.result.title,
                        description: res.result.description,
                        date: moment(res.result.startDate),
                        time: moment(res.result.startDate),
                    });

                    // Trigger validation for the patched fields
                    Object.keys(this.eventForm.controls).forEach((key) => {
                        this.eventForm.get(key)?.updateValueAndValidity();
                    });
                });
        }
    }

    minDateValidator(control: AbstractControl): ValidationErrors | null {
        if (isDateLessThanToday(control.value)) {
            return { min: true };
        }

        return null;
    }

    minTimeValidator(control: AbstractControl): ValidationErrors | null {
        const form = control.parent;

        if (!form) {
            return null;
        }

        const dateTime = mergeDateAndTime(form.value.date, control.value);

        if (isPastDateTime(dateTime)) {
            return { min: true };
        }

        return null;
    }

    onSubmit(): void {
        const { title, description, date, time } = this.eventForm.value;
        const startDate = mergeDateAndTime(date, time).toISOString();

        if (!this.eventForm.valid) {
            return;
        }

        if (this.isEditing()) {
            this.http
                .put<IBaseResponse<unknown>>(
                    `api/v1/CalendarEvent/${this.eventId}`,
                    {
                        title,
                        description,
                        startDate,
                    }
                )
                .subscribe((res) => {
                    this.snackBarService.sucess('Edit operation is successful');
                });
        } else {
            this.http
                .post<IBaseResponse<unknown>>('api/v1/CalendarEvent', {
                    title,
                    description,
                    startDate,
                })
                .subscribe((res) => {
                    this.snackBarService.sucess(
                        'Create operation is successful'
                    );
                });
        }
    }
}
