import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { SnackbarService } from '../services/snackbar.service';

export const exceptionHandlingInterceptor: HttpInterceptorFn = (
    req: HttpRequest<any>,
    next
) => {
    const snackBarService = inject(SnackbarService); // Inject MatSnackBar

    return next(req).pipe(
        tap({
            next: (value: any) => {
                console.log(value);

                if (value.isSuccess === false) {
                }
            },
            error: ({ error }) => {
                let msg =
                    'An unknown error occured during your request, please try again later';

                if (error?.message) {
                    msg = error.message;
                }

                snackBarService.error(msg);
            },
        })
    );
};
