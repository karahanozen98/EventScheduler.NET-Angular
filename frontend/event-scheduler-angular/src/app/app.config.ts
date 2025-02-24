import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
    PreloadAllModules,
    provideRouter,
    withPreloading,
} from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import {
    MAT_MOMENT_DATE_ADAPTER_OPTIONS,
    MomentDateAdapter,
} from '@angular/material-moment-adapter';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';
import { baseUrlInterceptor } from './interceptors/base-url.interceptor';
import { DatePipe } from '@angular/common';
import { exceptionHandlingInterceptor } from './interceptors/exception-handling.interceptor';

export const appConfig: ApplicationConfig = {
    providers: [
        provideHttpClient(
            withInterceptors([
                baseUrlInterceptor,
                authInterceptor,
                exceptionHandlingInterceptor,
            ])
        ),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(
            routes,
            withPreloading(PreloadAllModules)
            // withInMemoryScrolling({scrollPositionRestoration: 'enabled'})
        ),
        provideAnimationsAsync(),
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {
                floatLabel: 'always',
                appearance: 'outline',
            },
        },
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
        },
        {
            provide: MAT_DATE_FORMATS,
            useValue: {
                parse: {
                    dateInput: 'YYYY-MM-DD',
                    timeInput: 'HH:mm',
                },
                display: {
                    dateInput: 'YYYY-MM-DD',
                    monthYearLabel: 'LLL yyyy',
                    dateA11yLabel: 'DD',
                    monthYearA11yLabel: 'LLLL yyyy',
                    timeInput: 'HH:mm',
                    timeOptionLabel: 'HH:mm',
                },
            },
        },
        {
            provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS,
            useValue: { useUtc: false },
        },
        {
            provide: DatePipe,
        },
    ],
};
