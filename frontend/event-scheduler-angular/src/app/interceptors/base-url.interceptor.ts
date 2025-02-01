import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
    if (!req.url.startsWith('http')) {
        const modifiedReq = req.clone({
            url: `${environment.apiUrl}/${req.url}`,
        });
        return next(modifiedReq);
    }

    return next(req);
};
