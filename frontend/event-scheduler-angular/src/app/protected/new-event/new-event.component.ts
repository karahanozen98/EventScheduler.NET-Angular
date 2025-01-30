import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTimepickerModule } from '@angular/material/timepicker';

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
    ],
})
export class NewEventComponent {
    private fb = inject(FormBuilder);
    eventForm = this.fb.group({
        title: [null, Validators.required],
        description: '',
        date: [null, Validators.required],
        time: [null, Validators.required],
    });

    onSubmit(): void {
        if (this.eventForm.valid) {
            console.log(this.eventForm.value);
        }
    }
}
