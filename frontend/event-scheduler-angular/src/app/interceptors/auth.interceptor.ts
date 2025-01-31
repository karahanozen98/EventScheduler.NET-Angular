import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const token = localStorage.getItem('token');

    if (token) {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    return next(req).pipe(
        tap({
            error: (error) => {
                if (error.status === 401) {
                    localStorage.removeItem('token');
                    window.location.assign('/login');
                }
            },
        })
    );
};
