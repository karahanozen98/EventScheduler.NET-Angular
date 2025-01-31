import moment from 'moment';
import { Component, inject } from '@angular/core';
import {
    ReactiveFormsModule,
    FormBuilder,
    Validators,
    AbstractControl,
    ValidationErrors,
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

@Component({
    selector: 'app-new-event',
    templateUrl: './new-event.component.html',
    styleUrl: './new-event.component.scss',
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
export class NewEventComponent {
    private fb = inject(FormBuilder);
    eventForm = this.fb.group({
        title: [null, Validators.required],
        description: [''],
        date: [moment(), [Validators.required, this.minDateValidator]],
        time: [null, [Validators.required, this.minTimeValidator]],
    });

    constructor(private http: HttpClient) {}

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
        const startDate = mergeDateAndTime(date, time);

        if (this.eventForm.valid) {
            this.http
                .post<IBaseResponse<unknown>>('api/v1/CalendarEvent', {
                    title,
                    description,
                    startDate,
                })
                .subscribe((res) => {
                    if (res.isSuccess) {
                        alert('Operation is successful');
                    }
                });
        }
    }
}
