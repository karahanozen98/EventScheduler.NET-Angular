import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root',
})
export class SnackbarService {
    private snackBar = inject(MatSnackBar);

    private showMessage(
        message: string,
        action: string = 'Close',
        duration: number,
        panelClass: string[] = ['snackbar-info']
    ): void {
        this.snackBar.open(message, action, {
            duration,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass,
        });
    }

    sucess(message: string): void {
        this.showMessage(message, 'OK', 3000, ['snackbar-success']);
    }

    error(message: string): void {
        this.showMessage(message, 'Dismiss', 3000, ['snackbar-error']);
    }

    warning(message: string): void {
        this.showMessage(message, 'Dismiss', 3000, ['snackbar-warning']);
    }
}
